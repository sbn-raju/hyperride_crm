const dotenv = require("dotenv");
dotenv.config();


//Getting the Username and the Password from the ENV file.
const username = process.env.RABBIT_MQ_USERNAME;
const password = process.env.RABBIT_MQ_PASSWORD;

//Making the Connection url with the Rabbit mq server. 
const RabbitMqConnectionUri = `amqp://${username}:${password}@194.238.19.77`;

module.exports = RabbitMqConnectionUri;