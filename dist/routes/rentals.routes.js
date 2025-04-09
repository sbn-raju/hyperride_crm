"use strict";

var express = require("express");
var _require = require("../middleware/auth.middleware"),
  userAuthentication = _require.userAuthentication;
var _require2 = require("../controllers/rentals.controllers"),
  addRentalController = _require2.addRentalController,
  fetchAllRentalController = _require2.fetchAllRentalController,
  getRentalcontroller = _require2.getRentalcontroller,
  updateRentalController = _require2.updateRentalController,
  deleteRentalController = _require2.deleteRentalController,
  getRentalPlanOnCategory = _require2.getRentalPlanOnCategory,
  getRentalCategory = _require2.getRentalCategory;
var rentalRoute = express();
rentalRoute.route("/add").post(userAuthentication, addRentalController);
rentalRoute.route("/fetch").get(userAuthentication, fetchAllRentalController);
rentalRoute.route("/fetch-single/:id").get(userAuthentication, getRentalcontroller);
rentalRoute.route("/updated").put(userAuthentication, updateRentalController);
rentalRoute.route("/delete").put(userAuthentication, deleteRentalController);
rentalRoute.route("/get-category").get(userAuthentication, getRentalCategory);
rentalRoute.route("/get/category-plans").post(userAuthentication, getRentalPlanOnCategory);
module.exports = rentalRoute;