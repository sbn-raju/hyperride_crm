const express = require('express');
const { getCustomersControllers, getCustomerControllers } = require('../controllers/customers.controllers');


const customerRoute = express();


customerRoute.route("/fetch").get(getCustomersControllers);

customerRoute.route("/get").get(getCustomerControllers);


module.exports = customerRoute;