"use strict";

var express = require('express');
var _require = require('../controllers/customers.controllers'),
  updateCustomerMobileController = _require.updateCustomerMobileController,
  getCustomersControllers = _require.getCustomersControllers,
  getCustomerControllers = _require.getCustomerControllers,
  getLastTransactionsDate = _require.getLastTransactionsDate,
  getCustomerDrivingLicencesControllers = _require.getCustomerDrivingLicencesControllers,
  getDrivingLicenseControllers = _require.getDrivingLicenseControllers,
  triggerAadharOtpController = _require.triggerAadharOtpController,
  verifyAadhaarOtpController = _require.verifyAadhaarOtpController;
var _require2 = require('../middleware/auth.middleware'),
  userAuthentication = _require2.userAuthentication;
var customerRoute = express();
customerRoute.route("/fetch").get(userAuthentication, getCustomersControllers);
customerRoute.route("/get").get(userAuthentication, getCustomerControllers);
customerRoute.route("/fetch-driving-licence").post(userAuthentication, getCustomerDrivingLicencesControllers);
customerRoute.route("/get-driving-license").get(userAuthentication, getDrivingLicenseControllers);
customerRoute.route("/trigger-aadhaar-otp").post(userAuthentication, triggerAadharOtpController);
customerRoute.route("/verify-aadhaar-otp").post(userAuthentication, verifyAadhaarOtpController);
//added this route to add user mobile no and alt no
customerRoute.route("/update-customer-mobile").post(userAuthentication, updateCustomerMobileController);
customerRoute.route("/last-booking-date").get(userAuthentication, getLastTransactionsDate);
module.exports = customerRoute;