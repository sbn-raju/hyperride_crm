"use strict";

var express = require("express");
var _require = require("../controllers/vehicle.controllers"),
  addVehicleControllers = _require.addVehicleControllers,
  freezeVehicleController = _require.freezeVehicleController,
  unfreezeVehicleController = _require.unfreezeVehicleController,
  getAllAvailableVehicleControllers = _require.getAllAvailableVehicleControllers,
  getAllVehicleControllers = _require.getAllVehicleControllers,
  getSingleVehicleControllers = _require.getSingleVehicleControllers,
  getAllFrezzedVehicleControllers = _require.getAllFrezzedVehicleControllers,
  getEngineTypeController = _require.getEngineTypeController,
  getVehicleCategoryController = _require.getVehicleCategoryController,
  getEngineAndCategory = _require.getEngineAndCategory,
  deleteVehicleController = _require.deleteVehicleController,
  getAllVehicleServiceControllers = _require.getAllVehicleServiceControllers,
  getVehicleInUseController = _require.getVehicleInUseController;
var upload = require("../helpers/multer");
var authorization = require("../middleware/autho.middleware.js");
var _require2 = require("../middleware/auth.middleware"),
  userAuthentication = _require2.userAuthentication;
var vehicleRoute = express();

//Add the Vehicle.
vehicleRoute.route("/add").post(userAuthentication, authorization(["superAdmin"]), upload.single('image'), addVehicleControllers);

//Freeze the Vehicle.
vehicleRoute.route("/freeze").put(userAuthentication, authorization(["superAdmin"]), freezeVehicleController);

//UnFreeze the Vehicle.
vehicleRoute.route("/unfreeze").put(userAuthentication, authorization(["superAdmin"]), unfreezeVehicleController);

//Avaiable Vehicles.
vehicleRoute.route("/available/all-fetch").get(userAuthentication, authorization(["superAdmin", "employee", "conflictManager"]), getAllAvailableVehicleControllers);

//All Vehicles.
vehicleRoute.route("/all-fetch").get(userAuthentication, authorization(["superAdmin"]), getAllVehicleControllers);

//Single Vehicle.
vehicleRoute.route("/single-fetch").get(userAuthentication, authorization(["superAdmin", "employee", "conflictManager"]), getSingleVehicleControllers);

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
module.exports = vehicleRoute;