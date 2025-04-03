const express = require('express');

const { putExtendBookingController,addBookings,endBookingController,getFilteredBookingsController, getCompletedBookingsControllers,getCancelledBookingsControllers,getLiveBookingsControllers, getAdvancedBookingsControllers, getSingleBookingController, exchangeBookingVehicleController, getOrderDetailsController, postReasonCancellation } = require('../controllers/bookings.controllers');

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

bookingRoute.route("/sales").post(userAuthentication,getFilteredBookingsController);

bookingRoute.route("/endbooking").post(userAuthentication,endBookingController);
bookingRoute.route("/reason-cancel").post(userAuthentication, postReasonCancellation);

bookingRoute.route("/extend-form").post(userAuthentication, putExtendBookingController);


module.exports = bookingRoute