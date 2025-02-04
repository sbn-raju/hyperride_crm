const express = require('express');
const { addBookings, getLiveBookingsControllers, getAdvancedBookingsControllers, getSingleBookingController } = require('../controllers/bookings.controllers');
const { userAuthentication } = require('../middleware/auth.middleware');

const bookingRoute = express();


bookingRoute.route("/add").post(userAuthentication, addBookings);

bookingRoute.route("/live-bookings").get(userAuthentication, getLiveBookingsControllers);

bookingRoute.route("/advanced-bookings").get(userAuthentication, getAdvancedBookingsControllers);

bookingRoute.route("/booking-details").get(userAuthentication, getSingleBookingController);

module.exports = bookingRoute