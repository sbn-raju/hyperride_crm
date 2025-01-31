const express = require("express");
const { addVehicleControllers, freezeVehicleController, unfreezeVehicleController, getAllAvailableVehicleControllers, getAllVehicleControllers, getSingleVehicleControllers, getAllFrezzedVehicleControllers, getEngineTypeController, getVehicleCategoryController, getEngineAndCategory } = require("../controllers/vehicle.controllers");
const upload = require("../helpers/multer");
const { userAuthentication } = require("../middleware/auth.middleware");


const vehicleRoute = express();

//Add the Vehicle.
vehicleRoute.route("/add").post(userAuthentication, upload.single('image'), addVehicleControllers);

//Freeze the Vehicle.
vehicleRoute.route("/freeze").put(userAuthentication, freezeVehicleController);

//UnFreeze the Vehicle.
vehicleRoute.route("/unfreeze").put(userAuthentication, unfreezeVehicleController);

//Avaiable Vehicles.
vehicleRoute.route("/available/all-fetch").get(userAuthentication, getAllAvailableVehicleControllers);

//All Vehicles.
vehicleRoute.route("/all-fetch").get(userAuthentication, getAllVehicleControllers);

//Single Vehicle.
vehicleRoute.route("/single-fetch").get(userAuthentication, getSingleVehicleControllers);

//Freezed Vehicles.
vehicleRoute.route("/freeze/all-fetch").get(userAuthentication, getAllFrezzedVehicleControllers);

//Engine Type.
vehicleRoute.route("/get/engine-type").get(userAuthentication, getEngineTypeController);

//Vehicle Category.
vehicleRoute.route("/get/vehicle-category").get(userAuthentication, getVehicleCategoryController);

//Vehicle.
vehicleRoute.route("/get/vehicles").post(userAuthentication, getEngineAndCategory);

module.exports = vehicleRoute