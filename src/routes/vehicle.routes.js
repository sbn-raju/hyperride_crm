const express = require("express");
const { addVehicleControllers, freezeVehicleController, unfreezeVehicleController, getAllAvailableVehicleControllers, getAllVehicleControllers, getSingleVehicleControllers, getAllFrezzedVehicleControllers, getEngineTypeController, getVehicleCategoryController, getEngineAndCategory, deleteVehicleController, getAllVehicleServiceControllers, getVehicleInUseController } = require("../controllers/vehicle.controllers");
const upload = require("../helpers/multer");
const authorization = require("../middleware/autho.middleware.js");
const { userAuthentication } = require("../middleware/auth.middleware");


const vehicleRoute = express();

//Add the Vehicle.
vehicleRoute.route("/add").post(userAuthentication, authorization(["superAdmin"]), upload.single('image'), addVehicleControllers);

//Freeze the Vehicle.
vehicleRoute.route("/freeze").put(userAuthentication, authorization(["superAdmin"]), freezeVehicleController);

//UnFreeze the Vehicle.
vehicleRoute.route("/unfreeze").put(userAuthentication, authorization(["superAdmin"]), unfreezeVehicleController);

//Avaiable Vehicles.
vehicleRoute.route("/available/all-fetch").get(userAuthentication, authorization(["superAdmin", "employee", "conflictManager"]), getAllAvailableVehicleControllers);

//All Vehicles.
vehicleRoute.route("/all-fetch").get(userAuthentication, authorization(["superAdmin", "employee", "conflictManager"]), getAllVehicleControllers);

//Single Vehicle.
vehicleRoute.route("/single-fetch").get(userAuthentication, authorization(["superAdmin", "employee", "conflictManager" ]), getSingleVehicleControllers);

//Freezed Vehicles.
vehicleRoute.route("/freeze/all-fetch").get(userAuthentication, authorization(["superAdmin"]), getAllFrezzedVehicleControllers);

//Engine Type.
vehicleRoute.route("/get/engine-type").get(userAuthentication, authorization(["superAdmin", "employee", "conflictManager"]), getEngineTypeController);

//Vehicle Category.
vehicleRoute.route("/get/vehicle-category").get(userAuthentication, authorization(["superAdmin", "employee", "conflictManager"]), getVehicleCategoryController);

//Vehicle.
vehicleRoute.route("/get/vehicles").post(userAuthentication, authorization(["superAdmin"]), getEngineAndCategory);

//Delete Vehicle 
vehicleRoute.route("/delete").put(userAuthentication, authorization(["superAdmin"]), deleteVehicleController);

//Service Vehicles.
vehicleRoute.route("/service/all-fetch").get(userAuthentication, authorization(["superAdmin", "conflictManager"]), getAllVehicleServiceControllers);

//Vehicle In Use.
vehicleRoute.route("/bike-in-use").get(userAuthentication, getVehicleInUseController);

module.exports = vehicleRoute