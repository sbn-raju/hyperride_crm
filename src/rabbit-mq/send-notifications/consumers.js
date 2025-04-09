const RabbitMqConnectionUri = require("../../utils/queuesUri.js");
const { connection } = require("../config.js");



//This function will consume the data and will send message to the particular user.
async function consumeNotification() {
    
    //Getting the message packet from the assigned Queue.
    //Firstly create the channel and connecting to the channel.
    try {
        const channel = await connection.createChannel();
        
        //Giving the Name of the Queue.
        const Qname = process.env.RABBIT_MQ_NOTIFICATION;

        //Connecting to the Queue.
        await channel.assertQueue(Qname, {
            durable: true,
        });

        //Getting the message packets from the queues and process it.
        await channel.consume(Qname, async(user) => {

            //Parsing the data.
            const parsedUser = JSON.parse(user.content.toString());

            //Consol logging in the user.
            console.log("Parsed User Details: ", parsedUser);

            //Writing the Twilio function to send the Messgae to use through the Whatsapp.
        })
    } catch (error) {
        console.log(error);
        return returnBody = {
            statusCode: "500",
            status: "INTERNAL_SERVER_ERROR",
            response: `Error in consuming notification ${error || error.message}` 
        }
    }
}