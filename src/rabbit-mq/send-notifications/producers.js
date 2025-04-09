const RabbitMqConnectionUri = require("../../utils/queuesUri.js");
const {connection} = require("../config.js");

async function produceNotification(user) {

    //This is for the Testing purpose which data is comming to Queues.
    console.log(user);

    //Getting the user Id.
    // Validation check for the user body.
    if(!user){
        //If not present user details send back the response or send the Queues.
        return returnBody = {
            statusCode: "400",
            status: "VALIDATION_ERROR",
            response: "User Details Not Found"
        }
    }

    //Assumming the following as the user details 
    // const user = {
    //     name: "username",
    //     mobile_number: "9XXXXXXXXXXX"
    // } 

    //Estiblishing the connection to the with the Queue Server.
    try {
        const channel = await connection.createChannel();

        //Giving the Name of the Queue.
        const Qname = process.env.RABBIT_MQ_NOTIFICATION;

        //Sending the Data to the Queue.
        channel.sendToQueue(Qname, Buffer.from(JSON.stringify(user)), {
            persistent: true,
        });

        console.log("Queue is Working...");

        //Returning the response of the Queue.
        return returnBody = {
            statusCode: "200",
            status: "SUCCESS",
            response: "User details is parsed into the queue successfully"
        }
    } catch (error) {
        console.log(error);
        return returnBody = {
            statusCode: "500",
            status: "INTERNAL_SERVER_ERROR",
            response: `Error in sending user details ${error.message || error}`
        }
    }
}


module.exports = {
    produceNotification
}