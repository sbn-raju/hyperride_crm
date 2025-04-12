const { pool } = require("../database/db.connect.js");
const moment = require('moment-timezone');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
const decryptData = require("../helpers/decrypter.js");

require("dotenv").config();

const addBookings = async (req, res) => {

    await pool.query('BEGIN');
    //Getting all the information from the request.
    //destructuring the pickup details,
    const { actual_return_datetime, km_readings, pickup_datetime, customer_id } = req.body.values;
    console.log(actual_return_datetime, km_readings, pickup_datetime);


    //Getting isExtended from the query.
    const { isExtended } = req.query;
    let isExtend = null;

    if (isExtended === 'extended') {
        isExtend = true;
    } else {
        isExtend = false;
    }

    //Validation check
    if (!actual_return_datetime || !km_readings || !pickup_datetime) {
        return res.status(400).json({
            success: false,
            message: "Pickup details required"
        })
    }


    //Destructuring the vehcile details , plan details and the payment details.
    const { booking_type, plan_selected, vehicle_category, engine_type, vehicle_selected, addons, amount_paid, deposit, total_amount_paid, comments, payment_mode, advance_amount } = req.body.values;



    //Getting the admin id from the middleware.
    const admin_id = req.user.id;

    //Query to save the pickup details.
    const addPickupDetailsQuery = "INSERT INTO pickup_details (actual_return_datetime, km_readings, pickup_datetime, updated_by, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    const addPickupDetailsValues = [actual_return_datetime, km_readings, pickup_datetime, admin_id, admin_id];
    const advancedsubval = total_amount_paid - advance_amount;
    try {
        const addPickupDetailsResult = await pool.query(addPickupDetailsQuery, addPickupDetailsValues);
        if (addPickupDetailsResult.rowCount != 0) {

            const pickup_details_id = addPickupDetailsResult.rows[0].id

            //Query to add the booking details like vehicle, plan and paymnet details.

            //firstly converting the addons id array into the string to save it in the database.
            const addonsString = addons.join(", ");
            const amount_pending = 0;

            //Getting the Current timestamp.
            const currentTimestamp = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            // const customer_id = 1;
            // let addBookingDetailsQuery = "";
            // let addBookingDetailsValues = [];

            // if(isExtend){
            //     addBookingDetailsQuery = "INSERT INTO bookings (customer_id, bike_id, plan_selected, booked_by, pickup_details, amount_paid, amount_deposit, amount_pending, booking_time, extra_addons, created_by, updated_by, booking_status, comments, payment_mode, is_extended, extended_details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id"
            //     addBookingDetailsValues = [customer_id, vehicle_selected, plan_selected, admin_id, pickup_details_id, amount_paid, deposit, amount_pending, currentTimestamp, addonsString, admin_id, admin_id, booking_type, comments, payment_mode, isExtend, booking_id] 
            // }else{
            //     addBookingDetailsQuery = "INSERT INTO bookings (customer_id, bike_id, plan_selected, booked_by, pickup_details, amount_paid, amount_deposit, amount_pending, booking_time, extra_addons, created_by, updated_by, booking_status, comments, payment_mode, is_extended) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id"
            //     addBookingDetailsValues = [customer_id, vehicle_selected, plan_selected, admin_id, pickup_details_id, amount_paid, deposit, amount_pending, currentTimestamp, addonsString, admin_id, admin_id, booking_type, comments, payment_mode, isExtend] 
            // }



            const addBookingDetailsQuery = "INSERT INTO bookings (customer_id, bike_id, plan_selected, booked_by, pickup_details, amount_paid, amount_deposit, amount_pending, booking_time, extra_addons, created_by, updated_by, booking_status, comments, payment_mode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id"
            const addBookingDetailsValues = [customer_id, vehicle_selected, plan_selected, admin_id, pickup_details_id, advancedsubval, deposit, amount_pending, currentTimestamp, addonsString, admin_id, admin_id, booking_type, comments, payment_mode]


            const addBookingDetailsResult = await pool.query(addBookingDetailsQuery, addBookingDetailsValues);
            if (addBookingDetailsResult.rowCount != 0) {

                const booking_details_id = addBookingDetailsResult.rows[0].id;

                //Generating the booking number.
                const monthAbbr = new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase();
                const booking_id = `HYPR-${monthAbbr}${booking_details_id}`

                //Updating the status of the bikes according to the booking type.
                //Updating the vehicle status only when it is the live bookings.
                if(booking_type === 'Live Booking'){
                    const updateVehicleStatusQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE id = $2 RETURNING id";
                const updateVehicleStatusValue = [false, vehicle_selected];

                const updateVehicleStatusResult = await pool.query(updateVehicleStatusQuery, updateVehicleStatusValue);

                if(updateVehicleStatusResult.rowCount == 0){
                    throw Error("Error in updating vehicle status");
                }
                }

                //Updating the booking of the booking.
                const updateBookingIdQuery = "UPDATE bookings SET booking_id = $1 WHERE id = $2";
                const updateBookingIdValues = [booking_id, booking_details_id];

                const updateBookingIdResult = await pool.query(updateBookingIdQuery, updateBookingIdValues);

                if (updateBookingIdResult.rowCount != 0) {
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
    const dropDate = req.query.dropDate;
    const rentalOption = req.query.rentalOption;
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
        ORDER BY b.id DESC
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
        ORDER BY b.id DESC
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


//This Controllers will confirm the advance bookings and update the status of the vehicle.
const confirmAdvancedBookingControllers = async(req, res)=>{

    //Getting the values from the request body.
    const {vehicle_id, booking_id} = req.body;

    //Getting validations of null values.
    if(!vehicle_id || !booking_id){
        return res.status(400).json({
            success: false,
            message: "Vehicle Id Or Booking Id is not present"
        })
    }

    //Fristly updating the vehicle status to false when the user have arrived.
    const updateBikeStatusQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE id = $2 RETURNING id";
    const updateBikeStatusValue = [false, vehicle_id];

    //Updating the status of the bookings status.
    const udpateBookingStatusQuery = "UPDATE bookings SET booking_status = $1 WHERE id = $2 RETURNING id";
    const updateBookingStatusValues = ["Live Booking", booking_id];

    try {
        const updateBikeStatusResult = await pool.query(updateBikeStatusQuery, updateBikeStatusValue);

        const updatBookingStatusResult = await pool.query(udpateBookingStatusQuery, updateBookingStatusValues);
        console.log(updateBikeStatusResult.rows, updatBookingStatusResult.rows)

        if(updateBikeStatusResult.rowCount != 0 && updatBookingStatusResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Booking is Confirmed"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Error is confirming the status"
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
        ORDER BY b.id DESC
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

const getSingleBookingController = async (req, res) => {

    //Getting the id from the query.
    const { booking_id } = req.query;

    //Validation check.
    if (!booking_id) {
        return res.status(200).json({
            success: false,
            message: "All Fields are required"
        })
    }


    //Query to get all the details of the booking from the database.
    const getSingleQuery = "SELECT b.id, b.booking_id, b.amount_paid, b.amount_deposit, b.booking_time, b.booking_status, b.extra_addons,b.comments,c.id AS customer_id, c.user_name, c.user_mobile,c.user_address,c.mobile_isverified,c.aadhar_isverified,c.user_adhaar_number, c.user_alt_no, v.id AS vehicle_id, v.vehicle_name, v.vehicle_number, p.rental_name, p.rental_category, p.rental_rate, pick.km_readings, pick.pickup_datetime, pick.actual_return_datetime FROM bookings b JOIN customer_registration c ON c.id = b.customer_id JOIN vehicle_master v ON v.id = b.bike_id JOIN rentals_plan p ON p.id = b.plan_selected JOIN pickup_details pick ON pick.id = b.pickup_details WHERE b.id = $1"

    const getSingleValue = [booking_id];

    try {
        const getSingleResult = await pool.query(getSingleQuery, getSingleValue);

        if (getSingleResult.rows.length > 0) {
            let bookingData = getSingleResult.rows[0];

            // Decrypt the aadhar number before sending response
            bookingData.user_adhaar_number = await decryptData(bookingData.user_adhaar_number);
            bookingData.actual_return_datetime = moment(bookingData.actual_return_datetime)
                .tz("Asia/Kolkata") // or your preferred timezone
                .format("YYYY-MM-DD HH:mm:ss"); // You can change the format if needed
                console.log(bookingData.actual_return_datetime);
        }
        //Getting Addons Details Also.
        const addonsString = getSingleResult.rows[0].extra_addons;
        const addonsArray = addonsString ? addonsString.split(", ") : [];
        console.log("Addons Array", addonsArray);

        const getAddonsDetails = await pool.query("SELECT addons_name, addons_amount FROM addons WHERE id = ANY($1)", [addonsArray]);

        const bookingDetails = getSingleResult.rows[0];
        const addonKey = "extra_addons_details";

        bookingDetails[addonKey] = getAddonsDetails.rows;

        if (getSingleResult.rowCount != 0) {
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
const exchangeBookingVehicleController = async (req, res) => {

    //Getting the details from the the request.
    const { booking_id, vehicle_number, vehicle_selected } = req.body;
    //vehicle_id is the old bike which is to be exchanged.
    //vehicle_selected is new selected vehicle.

    console.log(typeof (vehicle_selected));

    //Validation Check
    if (!booking_id || !vehicle_number || !vehicle_selected) {
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
        if (exchangeVehicleResult.rowCount != 0) {

            //This is to update the avilable of the vehicle which is previously selected to false.
            const updateVehicleStatusQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE id = $2";
            const updateVehicleStatusValue = [false, vehicle_selected];

            const updateVehicleStatusResult = await pool.query(updateVehicleStatusQuery, updateVehicleStatusValue);


            //This is to update the status of the vehicle which is selected now. 
            const updateVehicleAvailableQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE vehicle_number = $2";
            const updateVehicleAvailableValue = [true, vehicle_number];

            const updateVehicleAvailableResult = await pool.query(updateVehicleAvailableQuery, updateVehicleAvailableValue);


            if (updateVehicleStatusResult.rowCount != 0 && updateVehicleAvailableResult.rowCount != 0) {
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
const getOrderDetailsController = async (req, res) => {

    //Getting the Order Id from the query.
    const { order_id } = req.query;

    //Validation Check
    if (!order_id) {
        return res.status(400).json({
            success: false,
            message: "Order id is not present"
        })
    }

    //Query to get the order details.
    const getOrderDetailsQuery = "SELECT b.id, b.booking_status, b.comments, b.return_detail, b.booking_id, b.created_at, b.booking_time, b.amount_paid, b.amount_deposit, b.amount_pending, c.user_name, c.user_mobile, c.user_adhaar_number, c.user_address, c.user_gender, c.user_status, c.user_dob, c.user_care_of, v.vehicle_name, v.vehicle_number, v.engine_type, v.vehicle_category, v.vehicle_image, e.admin_name, e.admin_username, e.admin_email FROM bookings b JOIN customer_registration c ON c.id = b.customer_id JOIN vehicle_master v ON v.id = b.bike_id JOIN admin_registration e ON e.id = b.booked_by WHERE b.booking_id = $1"

    const getOrderDetailsValues = [order_id];

    try {
        const getOrderDetailsResult = await pool.query(getOrderDetailsQuery, getOrderDetailsValues);


        if (getOrderDetailsResult.rowCount != 0) {

            console.log(getOrderDetailsResult.rows);
            const getExtentionResult = await pool.query('SELECT * FROM bookings_extend WHERE booking_id = $1',[getOrderDetailsResult.rows[0]?.id]);


            return res.status(200).json({
                success: true,
                data: {
                    major: getOrderDetailsResult.rows,
                    minor: getExtentionResult.rows
                }
            })
        } else {
            return res.status(400).json({
                success: true,
                message: "No order details found for this order id"
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
        ORDER BY b.id DESC
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

const getFilteredBookingsController = async (req, res) => {
    const { startDate, endDate } = req.query;
    console.log(startDate, endDate);

    if (!startDate || !endDate) {
        return res.status(400).json({ success: false, message: "Start date and end date are required." });
    }

    const query = `
        SELECT 
            t.pickup_datetime::DATE AS booking_date,
            TO_CHAR(t.pickup_datetime, 'HH24:MI:SS') AS start_time,
            EXTRACT(EPOCH FROM (t.actual_return_datetime - t.pickup_datetime)) / 3600 AS duration,
            b.amount_paid AS total_price
        FROM bookings b 
        JOIN pickup_details t ON b.pickup_details = t.id 
        WHERE t.pickup_datetime::DATE BETWEEN $1 AND $2
        ORDER BY t.pickup_datetime ASC;
    `;

    try {
        const result = await pool.query(query, [startDate, endDate]);

        if (result?.rows?.length === 0) {
            return res.status(404).json({ success: false, message: "No data found for the given date range." });
        }

        // Create Excel workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sales Report");

        // Define column headers
        worksheet.columns = [
            { header: "Booking Date", key: "booking_date", width: 15 },
            { header: "Start Time (hrs)", key: "start_time", width: 15 },
            { header: "Duration (hrs)", key: "duration", width: 15 },
            { header: "Total Price", key: "total_price", width: 15 }
        ];

        // Add data to the worksheet
        result?.rows?.forEach(row => {
            worksheet.addRow({
                booking_date: row.booking_date,
                start_time: row.start_time,
                duration: row.duration ? Number(row.duration).toFixed(2) : "0.00",
                total_price: row.total_price
            });
        });

        // Ensure reports directory exists
        const reportsDir = path.join(__dirname, "../reports");
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        // Generate filename with formatted date
        const startDateFormatted = moment(startDate).format("DD-MM-YYYY");
        const filePath = path.join(reportsDir, `sales_report_${startDateFormatted}.xlsx`);

        // Save Excel file
        await workbook.xlsx.writeFile(filePath);

        // Send email with the file attached
        await sendEmailWithAttachment(filePath);

        return res.status(200).json({
            success: true,
            message: "Excel file generated and sent via email successfully",
            downloadLink: `http://localhost:5000/reports/sales_report_${startDateFormatted}.xlsx`
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
};

// 📌 Function to send email with attachment
const sendEmailWithAttachment = async (filePath) => {
    try {
        // Configure Nodemailer transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.VERIFICATION_USER_EMAIL, // Now sender
                pass: process.env.VERIFICATION_USER_PASSWORD,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.VERIFICATION_USER_EMAIL, // Sender email
            to: process.env.MASTER_EMAIL, // Receiver email
            subject: "Sales Report - HyperRide",
            text: "Please find the attached sales report.",
            attachments: [
                {
                    filename: path.basename(filePath), // Extract file name
                    path: filePath,
                },
            ],
        };

        // Send email
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};


//This API will capture the reason for the cancellation of the application.
const postReasonCancellation = async (req, res) => {

    //Getting the booking id from the query (booking_id).
    const { booking_id } = req.query;

    //Get the reason from the body.
    const { reason } = req.body;

    //Validation Check.
    if (!booking_id || !reason) {
        return res.status(400).json({
            success: false,
            message: "Booking Id is not present"
        })
    }

    //Reason for the Cancellation.
    const postReasonQuery = "WITH updated_bookings AS (UPDATE bookings SET reason_for_cancel = $1, booking_status = $2 WHERE id = $3 RETURNING bike_id) UPDATE vehicle_master SET vehicle_isavailable = $4 WHERE id IN (SELECT bike_id FROM updated_bookings) RETURNING id";
    const postReasonValues = [reason, "Cancelled Booking", booking_id, true];

    try {
        const postReasonResult = await pool.query(postReasonQuery, postReasonValues);
        console.log(postReasonResult.rows);
        if (postReasonResult.rowCount != 0) {
            return res.status(200).json({
                success: true,
                message: "Reason is added successfully"
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


//This controller will handle the extenstion of the particualar bookings.

// actual_return_datetime : "2025-03-31T02:00"
// addons : []
// advance_amount: 0
// amount_paid: 1299
// booking_id: 29
// comments:  ""
// coupons_id: ""
// customer_id :  28
// pickup_datetime :  "2025-03-30T14:00"
// plan_category :  "Weekend Plans"
// plan_selected :  8
// total_amount_paid :  0

const putExtendBookingController = async (req, res) => {

    //Getting the details from the body and validated it.
    const { actual_return_datetime, amount_paid, booking_id, customer_id, pickup_datetime, plan_selected, extended_return_datetime } = req.body;

    //Get User details from the middleware.
    const admin_id = req.user.id;

    //Validation check
    if (!customer_id || !booking_id) {
        return res.status(200).json({
            success: false,
            message: "Booking Id and Customer Id not present"
        })
    }

    //Queries to add the extended.
    const addExtendedBookingQuery = "INSERT INTO bookings_extend (user_id, booking_id, amount_paid, actual_return_timestamp, plan_selected, created_by, updated_by,extended_timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)";
    const addExtendedBookingValue = [customer_id, booking_id, amount_paid, actual_return_datetime, plan_selected, admin_id, admin_id, extended_return_datetime];

    try {
        const addExtendedBookingResult = await pool.query(addExtendedBookingQuery, addExtendedBookingValue);
        if (addExtendedBookingResult.rowCount != 0) {
            const getExistingAddonsQuery = "SELECT extra_addons FROM bookings WHERE id = $1";
            const existingAddonsResult = await pool.query(getExistingAddonsQuery, [booking_id]);

            let existingAddonsArray = [];
            if (existingAddonsResult.rows.length > 0 && existingAddonsResult.rows[0].extra_addons) {
                existingAddonsArray = existingAddonsResult.rows[0].extra_addons.split(",").map(Number); // Convert to array of numbers
            }

            // Step 2: Combine existing addons with new ones
            const newAddonsArray = req.body.addons || []; // Ensure new addons exist
            const updatedAddonsArray = [...new Set([...existingAddonsArray, ...newAddonsArray])]; // Merge without duplicates
            const updatedAddonsString = updatedAddonsArray.join(", "); // Convert back to a comma-separated string
            console.log(updatedAddonsString);

            // Step 3: Update the database with the new addons list
            const updateOriginalOrderStatus = `
              UPDATE bookings 
              SET is_extended = $1, extra_addons = $2 
              WHERE id = $3
              RETURNING id
            `;

            const updateOriginalOrderStatusResult = await pool.query(updateOriginalOrderStatus, [
                true,
                updatedAddonsString,  
                booking_id
            ]);
            if (updateOriginalOrderStatusResult.rowCount != 0) {
                return res.status(200).json({
                    success: true,
                    message: "Extenstion added successfully"
                });
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



//This Controller will handle the affect of te complete booking
const endBookingController = async (req, res) => {

    //Getting the booking id from the request Query.
    const { booking_id } = req.query;
    console.log(booking_id);

    //Getting the admin id from the middleware.
    const admin_id = req.user.id;

    //Getting the return detail from the Query.
    const { testRide_by, vehicle_condition, damage, repair_cost, amount_collected, deposit_return, km_readings } = req.body;


    //Validation check of the booking id.
    if (!booking_id) {
        return res.status(400).json({
            success: false,
            message: "Booking is not present"
        })
    }

    //Validation check for the return details.
    if (!testRide_by || !damage || !amount_collected || !deposit_return || !km_readings) {
        return res.status(400).json({
            success: false,
            message: "Return form is not filled"
        })
    }

    //Now get all the details of the booking from the datbase and proceed with updating the vehicle and booking status.
    const getBikeDetailsQuery = "SELECT bike_id FROM bookings WHERE id = $1";
    const getBikeDetailsValue = [booking_id];

    try {
        const getBikeDetailsResult = await pool.query(getBikeDetailsQuery, getBikeDetailsValue);
        if (getBikeDetailsResult.rowCount != 0) {
            //Once the bike details is got now lets insert the return form details into the database.
            //Query to insert the return form details.
            console.log(testRide_by, deposit_return, amount_collected, repair_cost, vehicle_condition, damage, admin_id, admin_id, km_readings);
            const return_datetime = new Date().toISOString(); // Current timestamp in ISO format
            const actual_datetime = new Date().toISOString(); // Use actual logic if different

            const addReturnFormQuery = `
INSERT INTO return_details 
(testride_by, deposit_return, amount_collected, repair_cost, vehicle_condition, damage, updated_by, created_by, km_readings, return_datetime, actual_datetime) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
RETURNING id
`;

            const addReturnFormValue = [
                testRide_by,
                deposit_return,
                amount_collected,
                repair_cost,
                vehicle_condition,
                damage,
                admin_id,
                admin_id,
                km_readings,
                return_datetime,
                actual_datetime
            ];

            const addReturnFormResult = await pool.query(addReturnFormQuery, addReturnFormValue);
            if (addReturnFormResult.rowCount == 0) {
                return res.status(400).json({
                    success: false,
                    message: "Something went wrong!"
                })
            }

            //Getting the vehicle id which is being booked under this order id.
            const vehicle_id = getBikeDetailsResult?.rows[0]?.bike_id;

            //Returning from here if the vehicle is NULL or UNDEFINE.
            if (!vehicle_id) {
                return res.status(400).json({
                    success: false,
                    message: "Vechile Id is not present"
                })
            }

            //Query to update the status of the vehicle and the booking of the ride.
            const updateBookingStatusQuery = "UPDATE bookings SET booking_status = $1 WHERE id = $2";
            const updateBookingStatusValue = ["Completed Booking", booking_id];

            const updateVehicleStatusQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE id = $2";
            const updateVehicelStatusValue = [true, vehicle_id];

            //Now Calling all the updates.
            const updateBookingStatusResult = await pool.query(updateBookingStatusQuery, updateBookingStatusValue);

            const updateVehicleStatusResult = await pool.query(updateVehicleStatusQuery, updateVehicelStatusValue);

            if (updateBookingStatusResult.rowCount != 0 && updateVehicleStatusResult.rowCount != 0) {
                return res.status(200).json({
                    success: true,
                    message: "Ride is finished successfully."
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
    confirmAdvancedBookingControllers,
    getSingleBookingController,
    exchangeBookingVehicleController,
    getOrderDetailsController,
    getCancelledBookingsControllers,
    getCompletedBookingsControllers,
    getFilteredBookingsController,
    postReasonCancellation,
    endBookingController,
    putExtendBookingController,
}






