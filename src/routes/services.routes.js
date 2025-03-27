const express = require("express");
const { addServicesDetails, getVehicleServiceDetails } = require("../controllers/services.controllers");
const { userAuthentication } = require("../middleware/auth.middleware");



const serviceRoute = express();


//Adding Services Details.
serviceRoute.route("/add-details").post(userAuthentication, addServicesDetails);

//Getting services details.
serviceRoute.route("/get-details").get(userAuthentication, getVehicleServiceDetails);

module.exports = serviceRoute