const RabbitMqConnectionUri = require("../utils/queuesUri.js");
const amqplib = require('amqplib');

//Declaring connection as the global variable so that it can be exported.
let connection = {};

//Creating Connection to the Application and the Rabbit MQ.
async function  connectRabbit(){

    //Estiblishing the connection between the server and the Rabbit mq.
    try {
        connection = await amqplib.connect(RabbitMqConnectionUri);
        console.log("Rabbit Mq Is Successfully Connected");
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
   connection,
   connectRabbit
}