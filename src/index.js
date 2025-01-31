const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")
const { connectToDatabase } = require("./database/db.connect");
const vehicleRoute = require("./routes/vehicle.routes");
const authRouter = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const cuponRoute = require("./routes/cupons.routes");
const addonsRoute = require("./routes/addons.routes");
const rentalRoute = require("./routes/rentals.routes");
const bookingRoute = require("./routes/bookings.routes");
const customerRoute = require("./routes/customers.routes");
dotenv.config();

//Importing the app
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Static Files
app.use(express.static(path.join(__dirname, "public")));


//Cors
app.use(cors({origin: ["http://admin.hyprride.com", "http://localhost:5173"]}));

//Importing Port number from the env.
const PORT  = process.env.PORT || 5000;

//Connecting to the database.
connectToDatabase();


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

//Listening to the server.
app.listen(PORT, ()=>{
    console.log(`Server is listening at the port number: ${PORT}`);
})