const express = require('express');

const { addBookings,getFilteredBookingsController, getCompletedBookingsControllers,getCancelledBookingsControllers,getLiveBookingsControllers, getAdvancedBookingsControllers, getSingleBookingController, exchangeBookingVehicleController, getOrderDetailsController, postReasonCancellation } = require('../controllers/bookings.controllers');

const { userAuthentication } = require('../middleware/auth.middleware');

const bookingRoute = express();


bookingRoute.route("/add").post(userAuthentication, addBookings);

bookingRoute.route("/live-bookings").get(userAuthentication, getLiveBookingsControllers);

bookingRoute.route("/advanced-bookings").get(userAuthentication, getAdvancedBookingsControllers);

bookingRoute.route("/cancel-bookings").get(userAuthentication, getCancelledBookingsControllers);

bookingRoute.route("/booking-details").get(userAuthentication, getSingleBookingController);

bookingRoute.route("/exchange-vehicle").put(userAuthentication, exchangeBookingVehicleController);

bookingRoute.route("/order-details").get(userAuthentication, getOrderDetailsController);

bookingRoute.route("/completed-bookings").get(userAuthentication, getCompletedBookingsControllers);

bookingRoute.route("/sales").post(getFilteredBookingsController);


bookingRoute.route("/reason-cancel").post(userAuthentication, postReasonCancellation);



module.exports = bookingRoute