const { pool } = require("../database/db.connect.js");
const moment = require('moment-timezone');



const addBookings = async(req, res)=>{

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
    const {booking_type, plan_selected, vehicle_category, engine_type, vehicle_selected, addons, amount_paid, deposit, total_amount_paid } = req.body.values;
    

    
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

            const addBookingDetailsQuery = "INSERT INTO bookings (customer_id, bike_id, plan_selected, booked_by, pickup_details, amount_paid, amount_deposit, amount_pending, booking_time, extra_addons, created_by, updated_by, booking_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id"
            const addBookingDetailsValues = [customer_id, vehicle_selected, plan_selected, admin_id, pickup_details_id, amount_paid, deposit, amount_pending, currentTimestamp, addonsString, admin_id, admin_id, booking_type] 
             
            const addBookingDetailsResult = await pool.query(addBookingDetailsQuery, addBookingDetailsValues);
            if(addBookingDetailsResult.rowCount != 0){

                const booking_details_id = addBookingDetailsResult.rows[0].id;

                //Generating the booking number.
                const monthAbbr = new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase();
                const booking_id = `HYPR-${monthAbbr}${booking_details_id}`

                const updateBookingIdQuery = "UPDATE bookings SET booking_id = $1 WHERE id = $2";
                const updateBookingIdValues = [booking_id, booking_details_id];

                const updateBookingIdResult = await pool.query(updateBookingIdQuery, updateBookingIdValues);

                if(updateBookingIdResult.rowCount != 0){
                    return res.status(201).json({
                        success: true,
                        message: "Booking created successfully"
                    })
                }
            }
        }
    } catch (error) {
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


module.exports = {
    addBookings,
    getLiveBookingsControllers,
    getAdvancedBookingsControllers
}






