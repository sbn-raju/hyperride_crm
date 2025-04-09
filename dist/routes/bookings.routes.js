"use strict";

var express = require('express');
var _require = require('../controllers/bookings.controllers'),
  putExtendBookingController = _require.putExtendBookingController,
  addBookings = _require.addBookings,
  endBookingController = _require.endBookingController,
  getFilteredBookingsController = _require.getFilteredBookingsController,
  getCompletedBookingsControllers = _require.getCompletedBookingsControllers,
  getCancelledBookingsControllers = _require.getCancelledBookingsControllers,
  getLiveBookingsControllers = _require.getLiveBookingsControllers,
  getAdvancedBookingsControllers = _require.getAdvancedBookingsControllers,
  getSingleBookingController = _require.getSingleBookingController,
  exchangeBookingVehicleController = _require.exchangeBookingVehicleController,
  getOrderDetailsController = _require.getOrderDetailsController,
  postReasonCancellation = _require.postReasonCancellation;
var _require2 = require('../middleware/auth.middleware'),
  userAuthentication = _require2.userAuthentication;
var bookingRoute = express();
bookingRoute.route("/add").post(userAuthentication, addBookings);
bookingRoute.route("/live-bookings").get(userAuthentication, getLiveBookingsControllers);
bookingRoute.route("/advanced-bookings").get(userAuthentication, getAdvancedBookingsControllers);
bookingRoute.route("/cancel-bookings").get(userAuthentication, getCancelledBookingsControllers);
bookingRoute.route("/booking-details").get(userAuthentication, getSingleBookingController);
bookingRoute.route("/exchange-vehicle").put(userAuthentication, exchangeBookingVehicleController);
bookingRoute.route("/order-details").get(userAuthentication, getOrderDetailsController);
bookingRoute.route("/completed-bookings").get(userAuthentication, getCompletedBookingsControllers);
bookingRoute.route("/sales").post(userAuthentication, getFilteredBookingsController);
bookingRoute.route("/endbooking").post(userAuthentication, endBookingController);
bookingRoute.route("/reason-cancel").post(userAuthentication, postReasonCancellation);
bookingRoute.route("/extend-form").post(userAuthentication, putExtendBookingController);
module.exports = bookingRoute;