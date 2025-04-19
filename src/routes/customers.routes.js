const express = require('express');
const { updateCustomerMobileController,getCustomersControllers, getCustomerControllers, getLastTransactionsDate,  getCustomerDrivingLicencesControllers, getDrivingLicenseControllers, triggerAadharOtpController, verifyAadhaarOtpController, addCustomerImageController } = require('../controllers/customers.controllers');
const { userAuthentication } = require('../middleware/auth.middleware');
const image_uploader = require('../helpers/image-uploader-s3');


const customerRoute = express();


customerRoute.route("/fetch").get(userAuthentication,getCustomersControllers);

customerRoute.route("/get").get(userAuthentication,getCustomerControllers);

customerRoute.route("/fetch-driving-licence").post(userAuthentication, getCustomerDrivingLicencesControllers);

customerRoute.route("/get-driving-license").get(userAuthentication,getDrivingLicenseControllers);

customerRoute.route("/trigger-aadhaar-otp").post(userAuthentication,triggerAadharOtpController);

customerRoute.route("/verify-aadhaar-otp").post(userAuthentication,verifyAadhaarOtpController);

//added this route to add user mobile no and alt no
customerRoute.route("/update-customer-mobile").post(userAuthentication,updateCustomerMobileController);

customerRoute.route("/last-booking-date").get(userAuthentication,getLastTransactionsDate);


module.exports = customerRoute;