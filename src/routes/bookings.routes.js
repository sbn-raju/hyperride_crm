const express = require('express');
const { addBookings, getLiveBookingsControllers, getAdvancedBookingsControllers } = require('../controllers/bookings.controllers');
const { userAuthentication } = require('../middleware/auth.middleware');

const bookingRoute = express();


bookingRoute.route("/add").post(userAuthentication, addBookings);

bookingRoute.route("/live-bookings").get(userAuthentication, getLiveBookingsControllers);

bookingRoute.route("/advanced-bookings").get(userAuthentication, getAdvancedBookingsControllers);
module.exports = bookingRoute