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
    const {booking_type, plan_selected, vehicle_category, engine_type, vehicle_selected, addons, amount_paid, deposit, total_amount_paid, comments, payment_mode } = req.body.values;
    

    
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

            const addBookingDetailsQuery = "INSERT INTO bookings (customer_id, bike_id, plan_selected, booked_by, pickup_details, amount_paid, amount_deposit, amount_pending, booking_time, extra_addons, created_by, updated_by, booking_status, comments, payment_mode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id"
            const addBookingDetailsValues = [customer_id, vehicle_selected, plan_selected, admin_id, pickup_details_id, amount_paid, deposit, amount_pending, currentTimestamp, addonsString, admin_id, admin_id, booking_type, comments, payment_mode] 
             
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
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 10; 
    const offset = (page - 1) * limit;
    const pickupDate = req.query.pickupDate; // Expected format: YYYY-MM-DD
    const dropDate=req.query.dropDate;
    const rentalOption= req.query.rentalOption;
    let vehicle = req.query.vehicle;  // This is an encoded JSON string

    if (vehicle) {
        try {
            vehicle = JSON.parse(decodeURIComponent(vehicle));  // Decode and parse
        } catch (error) {
            return res.status(400).json({ message: "Invalid vehicle format" });
        }
    }
    
    console.log(vehicle);
    let whereClause = `WHERE b.booking_status = $1`;
    const queryValues = ['Live Booking'];

    if (pickupDate) {
        whereClause += ` AND DATE(t.pickup_datetime) = $2`;
        queryValues.push(pickupDate);
    }
    if (dropDate) {
        whereClause += ` AND DATE(t.actual_return_datetime) = $2`;
        queryValues.push(dropDate);
    }
    if (rentalOption) {
        whereClause += ` AND p.rental_category = $2`;
        queryValues.push(rentalOption);
    }
    if (vehicle) {
        whereClause += ` AND v.vehicle_name = $2 AND v.vehicle_number = $3`;
        queryValues.push(vehicle.name);
        queryValues.push(vehicle.number);
    }
    
    const countQuery = `
        SELECT COUNT(*) FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause}
    `;

    const getLiveBookingsQuery = `
        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, 
               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, 
               p.rental_name, e.admin_name, t.pickup_datetime, t.actual_return_datetime, p.rental_category 
        FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause}
        ORDER BY b.id ASC
        LIMIT $${queryValues.length + 1} OFFSET $${queryValues.length + 2}
    `;

    try {
        const countResult = await pool.query(countQuery, queryValues);
        console.log(queryValues);
        
        console.log(countResult.rows);
        
        const totalCount = parseInt(countResult.rows[0].count, 10);

        const getLiveBookingsResult = await pool.query(getLiveBookingsQuery, [...queryValues, limit, offset]);

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
                message: "No live bookings found for the given filters.",
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
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 10; 
    const offset = (page - 1) * limit;
    const pickupDate = req.query.pickupDate; // Expected format: YYYY-MM-DD
    const dropDate = req.query.dropDate;
    const rentalOption = req.query.rentalOption;
    let vehicle = req.query.vehicle;  

    // Decode and parse vehicle JSON string if present
    if (vehicle) {
        try {
            vehicle = JSON.parse(decodeURIComponent(vehicle));  
        } catch (error) {
            return res.status(400).json({ message: "Invalid vehicle format" });
        }
    }

    console.log(vehicle);

    let whereClause = `WHERE b.booking_status = $1`;
    const queryValues = ['Advanced Booking']; // Change to Advanced Booking

    if (pickupDate) {
        whereClause += ` AND DATE(t.pickup_datetime) = $${queryValues.length + 1}`;
        queryValues.push(pickupDate);
    }
    if (dropDate) {
        whereClause += ` AND DATE(t.actual_return_datetime) = $${queryValues.length + 1}`;
        queryValues.push(dropDate);
    }
    if (rentalOption) {
        whereClause += ` AND p.rental_category = $${queryValues.length + 1}`;
        queryValues.push(rentalOption);
    }
    if (vehicle) {
        whereClause += ` AND v.vehicle_name = $${queryValues.length + 1} AND v.vehicle_number = $${queryValues.length + 2}`;
        queryValues.push(vehicle.name);
        queryValues.push(vehicle.number);
    }

    // Query to get total count of filtered advanced bookings
    const countQuery = `
        SELECT COUNT(*) FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause}
    `;

    // Query to fetch paginated advanced bookings
    const getAdvancedBookingsQuery = `
        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, 
               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, 
               p.rental_name, e.admin_name, t.pickup_datetime, t.actual_return_datetime, p.rental_category 
        FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause}
        ORDER BY b.id ASC
        LIMIT $${queryValues.length + 1} OFFSET $${queryValues.length + 2}
    `;

    try {
        const countResult = await pool.query(countQuery, queryValues);
        const totalCount = parseInt(countResult.rows[0].count, 10);

        const getAdvancedBookingsResult = await pool.query(getAdvancedBookingsQuery, [...queryValues, limit, offset]);

        if (getAdvancedBookingsResult.rowCount > 0) {
            return res.status(200).json({
                success: true,
                data: getAdvancedBookingsResult.rows,
                totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No advanced bookings found for the given filters.",
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


const getCancelledBookingsControllers = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const pickupDate = req.query.pickupDate;
    const dropDate = req.query.dropDate;
    const rentalOption = req.query.rentalOption;
    let vehicle = req.query.vehicle;

    if (vehicle) {
        try {
            vehicle = JSON.parse(decodeURIComponent(vehicle));
        } catch (error) {
            return res.status(400).json({ message: "Invalid vehicle format" });
        }
    }

    console.log(vehicle);

    let whereClause = `WHERE b.booking_status = $1`;
    const queryValues = ['Cancelled Booking'];

    if (pickupDate) {
        whereClause += ` AND DATE(t.pickup_datetime) = $${queryValues.length + 1}`;
        queryValues.push(pickupDate);
    }
    if (dropDate) {
        whereClause += ` AND DATE(t.actual_return_datetime) = $${queryValues.length + 1}`;
        queryValues.push(dropDate);
    }
    if (rentalOption) {
        whereClause += ` AND p.rental_category = $${queryValues.length + 1}`;
        queryValues.push(rentalOption);
    }
    if (vehicle) {
        whereClause += ` AND v.vehicle_name = $${queryValues.length + 1} AND v.vehicle_number = $${queryValues.length + 2}`;
        queryValues.push(vehicle.name);
        queryValues.push(vehicle.number);
    }

    const countQuery = `
        SELECT COUNT(*) FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause}
    `;

    const getCancelledBookingsQuery = `
        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, 
               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, 
               p.rental_name, e.admin_name, t.pickup_datetime, t.actual_return_datetime, p.rental_category 
        FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause}
        ORDER BY b.id ASC
        LIMIT $${queryValues.length + 1} OFFSET $${queryValues.length + 2}
    `;

    try {
        const countResult = await pool.query(countQuery, queryValues);
        const totalCount = parseInt(countResult.rows[0].count, 10);

        const getCancelledBookingsResult = await pool.query(getCancelledBookingsQuery, [...queryValues, limit, offset]);

        if (getCancelledBookingsResult.rowCount > 0) {
            return res.status(200).json({
                success: true,
                data: getCancelledBookingsResult.rows,
                totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No cancelled bookings found for the given filters.",
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



//This APIs Will get the booking details of the given order.
const getOrderDetailsController = async(req, res)=>{

    //Getting the Order Id from the query.
    const { order_id } = req.query;

    //Validation Check
    if(!order_id){
        return res.status(400).json({
            success: false,
            message: "Order id is not present"
        })
    }

    //Query to get the order details.
    const getOrderDetailsQuery = "SELECT b.booking_status, b.comments, b.return_detail, b.booking_id, b.created_at, b.booking_time, b.amount_paid, b.amount_deposit, b.amount_pending, c.user_name, c.user_mobile, c.user_adhaar_number, c.user_address, c.user_gender, c.user_status, c.user_dob, c.user_care_of, v.vehicle_name, v.vehicle_number, v.engine_type, v.vehicle_category, v.vehicle_image, e.admin_name, e.admin_username, e.admin_email FROM bookings b JOIN customer_registration c ON c.id = b.customer_id JOIN vehicle_master v ON v.id = b.bike_id JOIN admin_registration e ON e.id = b.booked_by WHERE b.booking_id = $1"

    const getOrderDetailsValues = [order_id];

    try {
        const getOrderDetailsResult = await pool.query(getOrderDetailsQuery, getOrderDetailsValues);

        if(getOrderDetailsResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getOrderDetailsResult.rows
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


const getCompleteBookingsControllers = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    let whereClause = "WHERE b.booking_status = $1";
    let queryParams = ['Live Booking'];

    if (startDate && endDate) {
        whereClause += ` AND t.pickup_datetime BETWEEN $2 AND $3`;
        queryParams.push(startDate, endDate);
    }

    const countQuery = `
        SELECT COUNT(*) FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause}
    `;

    const getBookingsQuery = `
        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, 
               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, 
               p.rental_name, e.admin_name, t.pickup_datetime 
        FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause} 
        ORDER BY b.id ASC
        LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `;

    try {
        const countResult = await pool.query(countQuery, queryParams);
        const totalCount = parseInt(countResult.rows[0].count, 10);

        queryParams.push(limit, offset);
        const bookingsResult = await pool.query(getBookingsQuery, queryParams);

        if (bookingsResult.rowCount > 0) {
            return res.status(200).json({
                success: true,
                data: bookingsResult.rows,
                totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No completed bookings found",
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
const getCompletedBookingsControllers = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const pickupDate = req.query.pickupDate;
    const dropDate = req.query.dropDate;
    const rentalOption = req.query.rentalOption;
    let vehicle = req.query.vehicle;

    if (vehicle) {
        try {
            vehicle = JSON.parse(decodeURIComponent(vehicle));
        } catch (error) {
            return res.status(400).json({ message: "Invalid vehicle format" });
        }
    }

    let whereClause = `WHERE b.booking_status = $1`;
    const queryValues = ['Completed Booking'];

    if (pickupDate) {
        whereClause += ` AND DATE(t.pickup_datetime) = $${queryValues.length + 1}`;
        queryValues.push(pickupDate);
    }
    if (dropDate) {
        whereClause += ` AND DATE(t.actual_return_datetime) = $${queryValues.length + 1}`;
        queryValues.push(dropDate);
    }
    if (rentalOption) {
        whereClause += ` AND p.rental_category = $${queryValues.length + 1}`;
        queryValues.push(rentalOption);
    }
    if (vehicle) {
        whereClause += ` AND v.vehicle_name = $${queryValues.length + 1} AND v.vehicle_number = $${queryValues.length + 2}`;
        queryValues.push(vehicle.name);
        queryValues.push(vehicle.number);
    }

    const countQuery = `
        SELECT COUNT(*) FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause}
    `;

    const getCompletedBookingsQuery = `
        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, 
               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, 
               p.rental_name, e.admin_name, t.pickup_datetime, t.actual_return_datetime, p.rental_category 
        FROM bookings b 
        JOIN customer_registration c ON b.customer_id = c.id 
        JOIN vehicle_master v ON b.bike_id = v.id 
        JOIN rentals_plan p ON b.plan_selected = p.id 
        JOIN admin_registration e ON b.booked_by = e.id 
        JOIN pickup_details t ON b.pickup_details = t.id 
        ${whereClause}
        ORDER BY b.id ASC
        LIMIT $${queryValues.length + 1} OFFSET $${queryValues.length + 2}
    `;

    try {
        const countResult = await pool.query(countQuery, queryValues);
        const totalCount = parseInt(countResult.rows[0].count, 10);

        const getCompletedBookingsResult = await pool.query(getCompletedBookingsQuery, [...queryValues, limit, offset]);

        if (getCompletedBookingsResult.rowCount > 0) {
            return res.status(200).json({
                success: true,
                data: getCompletedBookingsResult.rows,
                totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No completed bookings found for the given filters.",
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
    getAdvancedBookingsControllers,
    getSingleBookingController,
    exchangeBookingVehicleController,
    getOrderDetailsController,
    getCompleteBookingsControllers,
    getCancelledBookingsControllers,
    getCompletedBookingsControllers
}






