"use strict";

var express = require("express");
var _require = require("../controllers/services.controllers"),
  addServicesDetails = _require.addServicesDetails,
  getVehicleServiceDetails = _require.getVehicleServiceDetails;
var _require2 = require("../middleware/auth.middleware"),
  userAuthentication = _require2.userAuthentication;
var serviceRoute = express();

//Adding Services Details.
serviceRoute.route("/add-details").post(userAuthentication, addServicesDetails);

//Getting services details.
serviceRoute.route("/get-details").get(userAuthentication, getVehicleServiceDetails);
module.exports = serviceRoute;