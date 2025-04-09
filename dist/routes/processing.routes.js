"use strict";

var express = require("express");
var processingsFeesRouter = express.Router();
var _require = require("../controllers/processing.controllers.js"),
  addProcessingFeesController = _require.addProcessingFeesController,
  fetchProcessingFeesController = _require.fetchProcessingFeesController,
  updateProcessingFeesController = _require.updateProcessingFeesController,
  deleteProcessingFeesController = _require.deleteProcessingFeesController;
var _require2 = require("../middleware/auth.middleware.js"),
  userAuthentication = _require2.userAuthentication;

// Route to add processing fees
processingsFeesRouter.route("/add").post(userAuthentication, addProcessingFeesController);

// Route to fetch all processing fees
processingsFeesRouter.route("/fetch").get(userAuthentication, fetchProcessingFeesController);

// Route to update processing fees by ID
processingsFeesRouter.route("/update/:id").put(userAuthentication, updateProcessingFeesController);

// Route to delete processing fees by ID
processingsFeesRouter.route("/delete/:id")["delete"](userAuthentication, deleteProcessingFeesController);
module.exports = processingsFeesRouter;