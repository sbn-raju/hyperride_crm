const express = require("express");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./database/db.connect");
dotenv.config();

//Importing the app
const app = express();


//Importing Port number from the env.
const PORT  = process.env.PORT || 5000;

//Connecting to the database.
connectToDatabase();

//Listening to the server.
app.listen(PORT, ()=>{
    console.log(`Server is listening at the port number: ${PORT}`);
})