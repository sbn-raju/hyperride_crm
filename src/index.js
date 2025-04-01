const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const rateLimiter = require("express-rate-limit");
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require("./database/db.connect");
const vehicleRoute = require("./routes/vehicle.routes");
const authRouter = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const cuponRoute = require("./routes/cupons.routes");
const addonsRoute = require("./routes/addons.routes");
const rentalRoute = require("./routes/rentals.routes");
const bookingRoute = require("./routes/bookings.routes");
const customerRoute = require("./routes/customers.routes");
const serviceRoute = require("./routes/services.routes");
// const io = require("./web-sockets.js");
const pushRideCompleteNotifications = require("./crons-jobs/PushRideCompleteNotify");
const analyticsRoute = require("./routes/analytics.routes");
const processingsFeesRouter = require("./routes/processing.routes");
dotenv.config();

//Importing the app
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Cors
app.use(cors())
// app.use(cors({origin: ["http://admin.hyprride.com", "http://localhost:5173"]}));

//Adding the rate limiter to the application rto prevent DDos Attacks.
const responseMessage = {
    success: false,
    message: "We're experiencing high traffic right now. Please try again in a moment. Thank you for your patience!",
}
const limiterOptions = {
    windowMs : 1 * 60 * 1000,
    max: 100,
    message: responseMessage,
    standardHeaders: true, 
    legacyHeaders: false 
}
const limiter = rateLimiter(limiterOptions);
app.use(limiter);



//Parsing the cookies.
app.use(cookieParser());

//Static Files
app.use(express.static(path.join(__dirname, "public")));


//Importing Port number from the env.
const PORT  = process.env.PORT || 5000;

//Connecting to the database.
connectToDatabase();

//Making the Websockets Server for the notifications.
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: process.env.FRONTEND_URI,
        methods: ["GET", "POST"]
    }
});

//Exporting the IO so that it can be used in the cron-jobs.
const getSocketConnections = () =>{
    return io
}

//WebSockets Connection.
io.on("connection",(socket)=>{
    console.log("Connecting with client", socket.id);

    socket.on("disconnect", () =>{
        console.log("User disconnected:", socket.id);
    });
});

//Calling Cron Jobs to run when they are shedulec
// pushRideCompleteNotifications(getSocketConnections);

//Vehicles Routes
app.use("/api/v1.hyperride/vehicle", vehicleRoute);

//Auth Routes
app.use("/api/v1.hyperride/auth", authRouter);

//User Routes
app.use("/api/v1.hyperride/user/profile", userRoute);

//Cupons Routes
app.use("/api/v1.hyperride/cupons", cuponRoute);

//Addons Routes
app.use("/api/v1.hyperride/addons", addonsRoute);

//Rental Routes
app.use("/api/v1.hyperride/rentals", rentalRoute);

//Booking Routes
app.use("/api/v1.hyperride/bookings", bookingRoute);

//Customer Routes
app.use("/api/v1.hyperride/customers", customerRoute);

//Service Routes
app.use("/api/v1.hyperride/service", serviceRoute);

//Analytis Routes
app.use("/api/v1.hyperride/analytics", analyticsRoute);

//Processing Routes
app.use("/api/v1.hyperride/processing", processingsFeesRouter);

//Listening to the server.
server.listen(PORT, ()=>{
    console.log(`Server is listening at the port number: ${PORT}`);
})