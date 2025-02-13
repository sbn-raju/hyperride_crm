const express = require('express');
const { getCustomersControllers, getCustomerControllers, getCustomerDrivingLicencesControllers, getDrivingLicenseControllers } = require('../controllers/customers.controllers');


const customerRoute = express();


customerRoute.route("/fetch").get(getCustomersControllers);

customerRoute.route("/get").get(getCustomerControllers);

customerRoute.route("/fetch-driving-licence").post(getCustomerDrivingLicencesControllers);

customerRoute.route("/get-driving-license").get(getDrivingLicenseControllers);


module.exports = customerRoute;