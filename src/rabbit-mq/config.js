const RabbitMqConnectionUri = require("../utils/queuesUri.js");
const amqplib = require('amqplib');

//Declaring connection as the global variable so that it can be exported.
let connection = null;

//Creating Connection to the Application and the Rabbit MQ.
async function connectRabbit(){

    //Estiblishing the connection between the server and the Rabbit mq.
    try {
        connection = await amqplib.connect(RabbitMqConnectionUri);
        console.log("Rabbit Mq Is Successfully Connected");
        
    } catch (error) {
        console.log(error);
    }
    
}


function getRabbitConnection() {
    if (!connection) {
      throw new Error("RabbitMQ connection has not been initialized. Call connectRabbit() first.");
    }
    return connection;
  }

module.exports = {
   connectRabbit,
   getRabbitConnection
}