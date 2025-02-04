const express = require("express");
const { userAuthentication } = require("../middleware/auth.middleware");
const { addRentalController, fetchAllRentalController, getRentalcontroller, updateRentalController, deleteRentalController, getRentalPlanOnCategory, getRentalCategory } = require("../controllers/rentals.controllers");




const rentalRoute = express();


rentalRoute.route("/add").post(userAuthentication, addRentalController);

rentalRoute.route("/fetch").get(userAuthentication, fetchAllRentalController);

rentalRoute.route("/fetch-single/:id").get(userAuthentication, getRentalcontroller);

rentalRoute.route("/updated").put(userAuthentication, updateRentalController);

rentalRoute.route("/delete").put(userAuthentication, deleteRentalController);

rentalRoute.route("/get-category").get(userAuthentication, getRentalCategory);

rentalRoute.route("/get/category-plans").post(userAuthentication, getRentalPlanOnCategory);

module.exports = rentalRoute;

