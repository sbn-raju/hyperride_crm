const { pool } = require("../database/db.connect.js");

const getEndingRidesProducer = async (hour, upHour) => {
  //Get all the timings from the booking which have the booking timings less then hour.
  const getRidesQuery =
    "SELECT b.id AS booking_id, b.booking_id AS order_id, b.booking_status, b.is_extended, COALESCE(be.actual_return_timestamp, pd.actual_return_datetime) AS actual_return_time FROM bookings b LEFT JOIN bookings_extend be ON b.id = be.booking_id LEFT JOIN pickup_details pd ON b.pickup_details = pd.id WHERE b.booking_status = $1 AND ((b.is_extended = $2 AND be.extended_timestamp BETWEEN $3 AND $4) OR (b.is_extended = $5 AND pd.actual_return_datetime BETWEEN $6 AND $7))";

  const getRidesValues = [
    "Live Booking",
    true,
    hour,
    upHour,
    false,
    hour,
    upHour,
  ];

  //Hit the Query to the database.
  try {
    const getRidesResults = await pool.query(getRidesQuery, getRidesValues);
    if (getRidesResults.rowCount != 0) {
    //   console.log("This is from the Database Services 1", getRidesResults.rows);
      return {
        statusCode: 200,
        data: getRidesResults.rows,
      };
    } else {
    //   console.log("No Rides to Send Notification");
      return  {
        statusCode: 204,
        data: "No Rides to Send Notification",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      data: `This is from the getEndingRideProduced: ${error}`,
    };
  }
};

//Token 2
//This function will add the notification into the database.
const addNotification = async(rideDetails, pushed_by)=>{

    //Validation check if the details are not present.
    if(!rideDetails || !pushed_by){
        return response = {
            statusCode: 400,
            status: "VALIDATION_ERROR",
            data:"Ride Details is not found"
        }
    }

    // console.log(rideDetails, pushed_by);
    const messageString = JSON.stringify(rideDetails);


    //Queries to add the notification to the database.
    const addNotificationQuery = "INSERT INTO notification (message, category, subcategory, pushed_by) VALUES ($1, $2, $3, $4) RETURNING *";
    const addNotificationValues = [messageString, "Admin Notifications", "Complete Ride Notifications", pushed_by];

    try {
      const addNotificationResults = await pool.query(addNotificationQuery, addNotificationValues);
      if(addNotificationResults.rowCount != 0){
        return response = {
          statusCode: 200,
          status: "SUCCESS",
          data:"Ride Details Saved Successfully"
        }
      }
    } catch (error) {
      console.log("Logging from the database services token 2")
      return response = {
        statusCode: 500,
        status: "INTERNAL_SERVER_ERROR",
        data:`Error in saving the notification ${error.message || error}`
      }
    }
}


//Token 3.
//This is the notification which will convert the user image and will add to the queues.
const imageProducers = async()=>{
  
  //Th
}

module.exports = {
  getEndingRidesProducer,
  addNotification,
};
