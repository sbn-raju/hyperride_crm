const { pool } = require("../database/db.connect.js");


const getStatsController = async(req, res)=>{

    //Query to fetch the data from the database.
    const getStats = "SELECT SUM(amount_paid) AS total_sales, COUNT(*) AS total_bookings, COUNT(booking_status) FILTER (WHERE booking_status = $1) AS live_bookings, COUNT(booking_status) FILTER (WHERE booking_status = $2) AS completed_bookings, COUNT(booking_status) FILTER (WHERE booking_status = $3) AS advance_bookings, COUNT(booking_status) FILTER (WHERE booking_status = $4) AS cancelled_bookings FROM bookings";
    const getStatsValues = ["Live Booking", "Completed Booking", "Advanced Booking", "Cancelled Booking"];


    const getNotificationsSatsQuery = "SELECT COUNT(message) FILTER (WHERE read = $1) AS notification_count FROM notification"
    const getNotificationsSatsValue = [false]; 


    try {
        const getStatsResponse = await pool.query(getStats, getStatsValues);

        //Getting the notifications which are not read by any exuctive.
        const getNotificationsSatsResult = await pool.query(getNotificationsSatsQuery, getNotificationsSatsValue);
        if(getStatsResponse.rowCount != 0 && getNotificationsSatsResult.rowCount != 0){
            return res.status(200).json({
                success: false,
                data: {
                    general_stats: getStatsResponse.rows,
                    notification_stats: getNotificationsSatsResult.rows
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: `Internal Server Error: ${error}`,
        });
    }
    
} 

module.exports = {
    getStatsController
}