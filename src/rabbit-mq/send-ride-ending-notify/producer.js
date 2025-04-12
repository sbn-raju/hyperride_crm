const { getRabbitConnection } = require("../config.js");

async function produceNotification(rideDetails) {

    //This is for the Testing purpose which data is comming to Queues.
    // console.log("Logging from the send-ride-ending-notify", rideDetails);

    //Getting the user Id.
    // Validation check for the user body.
    if(!rideDetails){
        //If not present user details send back the response or send the Queues.
        return returnBody = {
            statusCode: "400",
            status: "VALIDATION_ERROR",
            response: "Ride Details Not Found"
        }
    }

    //Estiblishing the connection to the with the Queue Server.

    try {
        //Getting the connection from the existing connection.
        const connection = await getRabbitConnection();

        //Creating the channel to send the messages into the queues.
        const channel = await connection.createChannel();

        

        //Giving the Name of the Queue.
        const Qname = process.env.RABBIT_MQ_NOTIFY;

        //Creating the Queue this function will only create the queue if it is not created.
        await channel.assertQueue(Qname, {
            durable: true
        });

        //Sending the Data to the Queue.
        const result = await channel.sendToQueue(Qname, Buffer.from(JSON.stringify(rideDetails)), {
            persistent: true,
        });

        console.log("Queue is Working...");

        if(result){
            //Returning the response of the Queue.
            return returnBody = {
                statusCode: "200",
                status: "SUCCESS",
                response: `Ride details having booking id ${rideDetails?.booking_id} is parsed into the queue successfully`
            }
        }else{
            return returnBody = {
                statusCode: "400",
                status: "BAD_REQUEST",
                response: `Error in parsing the ride details having booking id ${rideDetails?.booking_id} into the queue`
            }
        }

    } catch (error) {
        // console.log("Logging from the send-ride-ending-notify", error);
        return returnBody = {
            statusCode: "500",
            status: "INTERNAL_SERVER_ERROR",
            response: `Error in sending ride details ${error.message || error}`
        }
    }
}


module.exports = {
    produceNotification
}