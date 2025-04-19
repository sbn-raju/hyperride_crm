const getSocketConnections = require("../../index.js");
const { getIO } = require("../../services/sockets.services.js");
const RabbitMqConnectionUri = require("../../utils/queuesUri.js");
const { getRabbitConnection } = require("../config.js");
const { addNotification } = require("../../services/database.services.js");
const amqplib = require("amqplib");

//This function will consume the data and will send message to the particular user.
async function consumeNotification() {
  //Getting the message packet from the assigned Queue.
  //Firstly create the channel and connecting to the channel.
  try {
    // const connection = await getRabbitConnection();
    const connection = await amqplib.connect(RabbitMqConnectionUri);
    const channel = await connection.createChannel();

    //Giving the Name of the Queue.
    const Qname = process.env.RABBIT_MQ_NOTIFY;

    //Connecting to the Queue.
    await channel.assertQueue(Qname, {
      durable: true,
    });

    //Getting the message packets from the queues and process it.
    await channel.consume(Qname, async (rideDetails) => {
      //Parsing the data.
      const parsedRideDetails = JSON.parse(rideDetails.content.toString());

      //Consol logging in the user.
      // console.log("Parsed Ride Details: ", parsedRideDetails);
      const pushingFunction = "PushRideCompleteNotify";
      //Saving the notification of the ride ending in the dashboard so that the admin can keep track of it.
      const result = await addNotification(parsedRideDetails, pushingFunction);
      
      // console.log("Logging from consumeNotifications PushRideNotifications", result);
      if (result.statusCode == 200) {

        //Sending the notifcation to the frontend dashboard when the notification is saved.
        const io = await getIO();
        io.emit("ride_completed", {
          message: `Reminder! Ride with booking Id ${parsedRideDetails?.booking_id} is about end in next one hour`,
          rideId: parsedRideDetails?.booking_id,
        });

        //Console Logging the notification when the notification is pushed successfully.
        console.log("Logging from the comsume notification of the PushRideCompleteNotification is send successfully");

      }else if(result.statusCode == 400){
        console.log(result);
      }else if(result.statusCode == 500){
        console.log(result);
      }
      //Acknowledging the channel about the ride details notification.
      channel.ack(rideDetails);
    });
  } catch (error) {
    console.log(error);
    return (returnBody = {
      statusCode: "500",
      status: "INTERNAL_SERVER_ERROR",
      response: `Error in consuming notification ${error || error.message}`,
    });
  }
}

module.exports = {
  consumeNotification,
};
