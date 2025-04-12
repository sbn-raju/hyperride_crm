const cron = require("node-cron");
const io = require("../index.js");
const { pool } = require("../database/db.connect.js");
const convertTime = require("../helpers/timeConversations.js");
const { getEndingRidesProducer } = require("../services/database.services.js");
const {
  produceNotification,
} = require("../rabbit-mq/send-ride-ending-notify/producer.js");

//This will push the notification to the Dashboard.
const pushRideCompleteNotifications = (getSocketConnections) => {
  cron.schedule("* * * * *", async () => {
    console.log("Checking for completed rides...");

    //This is Today's time.
    const now = new Date();
    //Adding the next hour in today's date for the getting the ride getting complete in nect one hour.
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);

    //Converting the time to the desired way.
    const hour = convertTime(now);
    const upHour = convertTime(nextHour);


    //Getting the results from the database.
    const result = await getEndingRidesProducer(hour, upHour);
    // console.log(result);

    //Pushing the results into the queres so that the worker will process the Queries.
    if (result.statusCode == 200) {
      //Now iterating the data got from the database and make the message and sending it into the queues for the further processing.
      result?.data?.map(async (messagePacket) => {
        //Console log which message packet is recived by function from the database.
        //Pushing each messages into the queues by using producers.
        const response = await produceNotification(messagePacket);
        // console.log("Logging from PushRideNotification after the pushing details into Queues", response);

        if(response.statusCode === "200" && response.status === "SUCCESS"){
          console.log("Logging from PushRideCompleteNotification", response?.response);
        }else if(response.statusCode === "400" && response.status === "BAD_REQUEST"){
          console.log("Logging from PushRideCompleteNotification", response?.response);
        }
        else if(response.statusCode === "400" && response.status === "VALIDATION_ERROR"){
          console.log("Logging from PushRideCompleteNotification", response?.response);
        }
        else if(response.statusCode === "500" && response.status === "INTERNAL_SERVER_ERROR"){
          console.log("Logging from PushRideCompleteNotification", response?.response);
        }
      });
    } else if (result.statusCode == 204) {
      //Console log if no rides are found.
      console.log("Logging from PushRideNotification", result.data);
    } else if (result.statusCode == 500) {
      //Console log if any errors are present.
      console.log("Logging from PushRideNotification", result.data);
    }
  });
};

module.exports = pushRideCompleteNotifications;

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
