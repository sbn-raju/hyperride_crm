const { pool } = require("../database/db.connect.js");
const moment = require('moment-timezone');



const addBookings = async(req, res)=>{

    await pool.query('BEGIN');
    //Getting all the information from the request.
    //destructuring the pickup details,
    const { actual_return_datetime, km_readings, pickup_datetime, customer_id } = req.body.values;
    console.log( actual_return_datetime, km_readings, pickup_datetime);

    //Validation check
    if(!actual_return_datetime || !km_readings || !pickup_datetime){
        return res.status(400).json({
            success: false,
            message: "Pickup details required"
        })
    }


    //Destructuring the vehcile details , plan details and the payment details.
    const {booking_type, plan_selected, vehicle_category, engine_type, vehicle_selected, addons, amount_paid, deposit, total_amount_paid, comments } = req.body.values;
    

    
    //Getting the admin id from the middleware.
    const admin_id = req.user.id;

    //Query to save the pickup details.
    const addPickupDetailsQuery = "INSERT INTO pickup_details (actual_return_datetime, km_readings, pickup_datetime, updated_by, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    const addPickupDetailsValues = [actual_return_datetime, km_readings, pickup_datetime, admin_id, admin_id];

    try {
        const addPickupDetailsResult = await pool.query(addPickupDetailsQuery, addPickupDetailsValues);
        if(addPickupDetailsResult.rowCount != 0){

            const pickup_details_id = addPickupDetailsResult.rows[0].id
            
            //Query to add the booking details like vehicle, plan and paymnet details.

            //firstly converting the addons id array into the string to save it in the database.
            const addonsString = addons.join(", ");
            const amount_pending = 0;

            //Getting the Current timestamp.
            const currentTimestamp = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            // const customer_id = 1;

            const addBookingDetailsQuery = "INSERT INTO bookings (customer_id, bike_id, plan_selected, booked_by, pickup_details, amount_paid, amount_deposit, amount_pending, booking_time, extra_addons, created_by, updated_by, booking_status, comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id"
            const addBookingDetailsValues = [customer_id, vehicle_selected, plan_selected, admin_id, pickup_details_id, amount_paid, deposit, amount_pending, currentTimestamp, addonsString, admin_id, admin_id, booking_type, comments] 
             
            const addBookingDetailsResult = await pool.query(addBookingDetailsQuery, addBookingDetailsValues);
            if(addBookingDetailsResult.rowCount != 0){

                const booking_details_id = addBookingDetailsResult.rows[0].id;

                //Generating the booking number.
                const monthAbbr = new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase();
                const booking_id = `HYPR-${monthAbbr}${booking_details_id}`

                //Updateing the status of the bikes to the people.
                const updateVehicleStatusQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE id = $2";
                const updateVehicleStatusValue = [false, vehicle_selected];

                const updateVehicleStatusResult = await pool.query(updateVehicleStatusQuery, updateVehicleStatusValue);

                //Updating the booking of the booking.
                const updateBookingIdQuery = "UPDATE bookings SET booking_id = $1 WHERE id = $2";
                const updateBookingIdValues = [booking_id, booking_details_id];

                const updateBookingIdResult = await pool.query(updateBookingIdQuery, updateBookingIdValues);

                if(updateBookingIdResult.rowCount != 0 && updateVehicleStatusResult.rowCount != 0){
                    await pool.query('COMMIT');
                    return res.status(201).json({
                        success: true,
                        message: "Booking created successfully"
                    })
                }
            }
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        }) 
    }
}


const getLiveBookingsControllers = async (req, res) => {

    // Extract page and limit from query parameters with defaults
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 10; 
    const offset = (page - 1) * limit; 

    // Count query to get the total number of live bookings
    const countQuery = `
        SELECT COUNT(*) FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        WHERE b.booking_status = $1
    `;
    const countQueryValues = ['Live Booking'];

    // Query to fetch live bookings with pagination
    const getLiveBookingsQuery = `
        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, 
               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, 
               p.rental_name, e.admin_name, t.pickup_datetime 
        FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        WHERE b.booking_status = $1 
        ORDER BY b.id ASC
        LIMIT $2 OFFSET $3
    `;

    try {
        // Execute count query
        const countResult = await pool.query(countQuery, countQueryValues);
        const totalCount = parseInt(countResult.rows[0].count, 10);

        // Execute fetch query
        const getLiveBookingsResult = await pool.query(getLiveBookingsQuery, [...countQueryValues, limit, offset]);

        if (getLiveBookingsResult.rowCount > 0) {
            return res.status(200).json({
                success: true,
                data: getLiveBookingsResult.rows,
                totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No live bookings found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        });
    }
};

const getAdvancedBookingsControllers = async (req, res) => {

    // Extract page and limit from query parameters with defaults
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 10; 
    const offset = (page - 1) * limit; 

    // Count query to get the total number of live bookings
    const countQuery = `
        SELECT COUNT(*) FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        WHERE b.booking_status = $1
    `;
    const countQueryValues = ['Advanced Booking'];

    // Query to fetch live bookings with pagination
    const getLiveBookingsQuery = `
        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, 
               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, 
               p.rental_name, e.admin_name, t.pickup_datetime 
        FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        WHERE b.booking_status = $1 
        ORDER BY b.id ASC
        LIMIT $2 OFFSET $3
    `;

    try {
        // Execute count query
        const countResult = await pool.query(countQuery, countQueryValues);
        const totalCount = parseInt(countResult.rows[0].count, 10);

        // Execute fetch query
        const getLiveBookingsResult = await pool.query(getLiveBookingsQuery, [...countQueryValues, limit, offset]);

        if (getLiveBookingsResult.rowCount > 0) {
            return res.status(200).json({
                success: true,
                data: getLiveBookingsResult.rows,
                totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No live bookings found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        });
    }
};

const getSingleBookingController = async(req, res)=>{

    //Getting the id from the query.
    const { booking_id } = req.query;

    //Validation check.
    if(!booking_id){
        return res.status(200).json({
            success: false,
            message: "All Fields are required"
        })
    }


    //Query to get all the details of the booking from the database.
    const getSingleQuery = "SELECT b.id, b.booking_id, b.amount_paid, b.amount_deposit, b.booking_time, b.booking_status, b.extra_addons,b.comments, c.user_name, c.user_mobile, c.user_alt_no, v.id AS vehicle_id, v.vehicle_name, v.vehicle_number, p.rental_name, p.rental_category, p.rental_rate, pick.km_readings, pick.pickup_datetime, pick.actual_return_datetime FROM bookings b JOIN customer_registration c ON c.id = b.customer_id JOIN vehicle_master v ON v.id = b.bike_id JOIN rentals_plan p ON p.id = b.plan_selected JOIN pickup_details pick ON pick.id = b.pickup_details WHERE b.id = $1"

    const getSingleValue = [booking_id];

    try {
        const getSingleResult = await pool.query(getSingleQuery, getSingleValue);

        //Getting Addons Details Also.
        const addonsString = getSingleResult.rows[0].extra_addons;
        const addonsArray = addonsString ? addonsString.split(", ") : [];
        console.log("Addons Array", addonsArray);

        const getAddonsDetails = await pool.query("SELECT addons_name, addons_amount FROM addons WHERE id = ANY($1)", [addonsArray]);

        const bookingDetails = getSingleResult.rows[0];
        const addonKey = "extra_addons_details";

        bookingDetails[addonKey] = getAddonsDetails.rows;

        if(getSingleResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: bookingDetails
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        });
    }
}



//Updating the exisiting bookings.
//This API will handle the exchanges the booking vehicle by making the other available.
const exchangeBookingVehicleController = async(req, res)=>{

    //Getting the details from the the request.
    const {booking_id, vehicle_number, vehicle_selected } = req.body;
    //vehicle_id is the old bike which is to be exchanged.
    //vehicle_selected is new selected vehicle.

    console.log(typeof(vehicle_selected));

    //Validation Check
    if(!booking_id || !vehicle_number || !vehicle_selected){
        return res.status(200).json({
            success: false,
            message: "All Id are required"
        })
    }


    //Query to update the booking status.
    const exchangeVehicleQuery = "UPDATE bookings SET bike_id = $1 WHERE booking_id = $2";
    const exchangeVehicleValue = [vehicle_selected, booking_id];

    try {
        const exchangeVehicleResult = await pool.query(exchangeVehicleQuery, exchangeVehicleValue);
        if(exchangeVehicleResult.rowCount != 0){

            //This is to update the avilable of the vehicle which is previously selected to false.
            const updateVehicleStatusQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE id = $2";
            const updateVehicleStatusValue = [false, vehicle_selected];

            const updateVehicleStatusResult = await pool.query(updateVehicleStatusQuery, updateVehicleStatusValue);


            //This is to update the status of the vehicle which is selected now. 
            const updateVehicleAvailableQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE vehicle_number = $2";
            const updateVehicleAvailableValue = [true, vehicle_number];

            const updateVehicleAvailableResult = await pool.query(updateVehicleAvailableQuery, updateVehicleAvailableValue);


            if(updateVehicleStatusResult.rowCount != 0 && updateVehicleAvailableResult.rowCount != 0){
                //This is the response.
                return res.status(200).json({
                    success: false,
                    message: "Vehicle updated successfully"
                })
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        });
    }
}

module.exports = {
    addBookings,
    getLiveBookingsControllers,
    getAdvancedBookingsControllers,
    getSingleBookingController,
    exchangeBookingVehicleController
}






