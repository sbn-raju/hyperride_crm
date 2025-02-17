const express = require('express');
const { getCustomersControllers, getCustomerControllers, getLastTransactionsDate,  getCustomerDrivingLicencesControllers, getDrivingLicenseControllers, triggerAadharOtpController, verifyAadhaarOtpController } = require('../controllers/customers.controllers');
const { userAuthentication } = require('../middleware/auth.middleware');


const customerRoute = express();


customerRoute.route("/fetch").get(getCustomersControllers);

customerRoute.route("/get").get(getCustomerControllers);

customerRoute.route("/fetch-driving-licence").post(userAuthentication, getCustomerDrivingLicencesControllers);

customerRoute.route("/get-driving-license").get(getDrivingLicenseControllers);

customerRoute.route("/trigger-aadhaar-otp").post(triggerAadharOtpController);

customerRoute.route("/verify-aadhaar-otp").post(verifyAadhaarOtpController);

customerRoute.route("/last-booking-date").get(getLastTransactionsDate);


module.exports = customerRoute;