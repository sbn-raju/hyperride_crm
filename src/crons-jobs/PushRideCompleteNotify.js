const cron = require('node-cron');
const io = require("../index.js");
const { pool } = require('../database/db.connect.js');
const convertTime = require('../helpers/timeConversations.js');



//This will push the notification to the Dashboard.
const pushRideCompleteNotifications = (getSocketConnections) =>{
    cron.schedule("* * * * *", async() => {
        console.log("Checking for completed rides...");
        

        //This is Today's time.
        const now = new Date();
        //Adding the next hour in today's date for the getting the ride getting complete in nect one hour.
        const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
        
        //Converting the time to the desired way.
        const hour = convertTime(now);
        const upHour = convertTime(nextHour);

        console.log(typeof(hour), upHour);

        //Getting the IO connections.
        const io = getSocketConnections();

        //Get all the timings from the booking which have the booking timings less then hour.
        const getRidesQuery = "SELECT b.id AS booking_id, b.booking_status, b.is_extended, COALESCE(be.actual_return_timestamp, pd.actual_return_datetime) AS actual_return_time FROM bookings b LEFT JOIN bookings_extend be ON b.id = be.booking_id LEFT JOIN pickup_details pd ON b.pickup_details = pd.id WHERE b.booking_status = $1 AND ((b.is_extended = $2 AND be.actual_return_timestamp BETWEEN $3 AND $4) OR (b.is_extended = $5 AND pd.actual_return_datetime BETWEEN $6 AND $7))";
        // const getRidesQuery = "SELECT * FROM pickup_details"
        const getRidesValues = ["Live Booking", true, hour, upHour, false, hour, upHour];
        
        //Hit the Query to the database.
        try {
          const getRidesResults = await pool.query(getRidesQuery, getRidesValues);
          if(getRidesResults.rowCount != 0){
            console.log(getRidesResults.rows); 
          }else{
            console.log("No Rides to Send Notification");
          }
        } catch (error) {
          console.log(error);
        }
        
        // rides.forEach((ride) => {
        //   if (ride.status === "completed") {
        //     // ride.status = "completed";
      
        //     // Send notification to the user
        //     io.emit("ride_completed", {
        //       message: `Your ride ${ride.id} is over. Thank you!`,
        //       rideId: ride.id,
        //     });
      
        //     console.log(`Ride ${ride.id} marked as completed.`);
        //   }
        // });
    });
}


module.exports = pushRideCompleteNotifications