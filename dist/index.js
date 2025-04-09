"use strict";

var express = require("express");
var dotenv = require("dotenv");
var cors = require("cors");
var path = require("path");
var http = require("http");
var _require = require("socket.io"),
  Server = _require.Server;
var rateLimiter = require("express-rate-limit");
var cookieParser = require('cookie-parser');
var _require2 = require("./database/db.connect"),
  connectToDatabase = _require2.connectToDatabase;
var vehicleRoute = require("./routes/vehicle.routes");
var authRouter = require("./routes/auth.routes");
var userRoute = require("./routes/user.routes");
var cuponRoute = require("./routes/cupons.routes");
var addonsRoute = require("./routes/addons.routes");
var rentalRoute = require("./routes/rentals.routes");
var bookingRoute = require("./routes/bookings.routes");
var customerRoute = require("./routes/customers.routes");
var serviceRoute = require("./routes/services.routes");
// const io = require("./web-sockets.js");
var pushRideCompleteNotifications = require("./crons-jobs/PushRideCompleteNotify");
var analyticsRoute = require("./routes/analytics.routes");
var processingsFeesRouter = require("./routes/processing.routes");
var _require3 = require("./services/s3Connect.services"),
  checkS3Connection = _require3.checkS3Connection,
  putObjectsS3Function = _require3.putObjectsS3Function;
dotenv.config();

//Importing the app
var app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//Cors
app.use(cors());
// app.use(cors({origin: ["http://admin.hyprride.com", "http://localhost:5173"]}));

//Adding the rate limiter to the application rto prevent DDos Attacks.
var responseMessage = {
  success: false,
  message: "We're experiencing high traffic right now. Please try again in a moment. Thank you for your patience!"
};
var limiterOptions = {
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: responseMessage,
  standardHeaders: true,
  legacyHeaders: false
};
var limiter = rateLimiter(limiterOptions);
app.use(limiter);

//Parsing the cookies.
app.use(cookieParser());

//Static Files
app.use(express["static"](path.join(__dirname, "public")));

//Importing Port number from the env.
var PORT = process.env.PORT || 5000;

//Connecting to the database.
connectToDatabase();

//Making the Websockets Server for the notifications.
var server = http.createServer(app);
var io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST"]
  }
});

//Exporting the IO so that it can be used in the cron-jobs.
var getSocketConnections = function getSocketConnections() {
  return io;
};

//WebSockets Connection.
io.on("connection", function (socket) {
  console.log("Connecting with client", socket.id);
  socket.on("disconnect", function () {
    console.log("User disconnected:", socket.id);
  });
});

//Connecting AWS S3
// connectS3Function();
// checkS3Connection();
// putObjectsS3Function();

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
server.listen(PORT, function () {
  console.log("Server is listening at the port number: ".concat(PORT));
});