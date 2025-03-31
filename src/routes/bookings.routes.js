const express = require('express');
const { addBookings, getLiveBookingsControllers, getAdvancedBookingsControllers, getSingleBookingController, exchangeBookingVehicleController, getOrderDetailsController, getCompleteBookingsControllers, postReasonCancellation } = require('../controllers/bookings.controllers');
const { userAuthentication } = require('../middleware/auth.middleware');

const bookingRoute = express();


bookingRoute.route("/add").post(userAuthentication, addBookings);

bookingRoute.route("/live-bookings").get(userAuthentication, getLiveBookingsControllers);

bookingRoute.route("/advanced-bookings").get(userAuthentication, getAdvancedBookingsControllers);

bookingRoute.route("/booking-details").get(userAuthentication, getSingleBookingController);

bookingRoute.route("/exchange-vehicle").put(userAuthentication, exchangeBookingVehicleController);

bookingRoute.route("/order-details").get(userAuthentication, getOrderDetailsController);

bookingRoute.route("/complete-bookings").get(userAuthentication, getCompleteBookingsControllers);

bookingRoute.route("/reason-cancel").post(userAuthentication, postReasonCancellation);

module.exports = bookingRoute