const express = require("express");
const { addVehicleControllers, freezeVehicleController, unfreezeVehicleController, getAllAvailableVehicleControllers, getAllVehicleControllers, getSingleVehicleControllers, getAllFrezzedVehicleControllers } = require("../controllers/vehicle.controllers");
const upload = require("../helpers/multer");
const { userAuthentication } = require("../middleware/auth.middleware");


const vehicleRoute = express();

//Add the Vehicle.
vehicleRoute.route("/add").post(userAuthentication, upload.single('image'), addVehicleControllers);

//Freeze the Vehicle.
vehicleRoute.route("/freeze").put(freezeVehicleController);

//UnFreeze the Vehicle.
vehicleRoute.route("/unfreeze").put(unfreezeVehicleController);

//Avaiable Vehicles.
vehicleRoute.route("/available/all-fetch").get(getAllAvailableVehicleControllers);

//All Vehicles.
vehicleRoute.route("/all-fetch").get(getAllVehicleControllers);

//Single Vehicle.
vehicleRoute.route("/single-fetch").get(getSingleVehicleControllers);

//Freezed Vehicles.
vehicleRoute.route("/freeze/all-fetch").get(getAllFrezzedVehicleControllers);

module.exports = vehicleRoute