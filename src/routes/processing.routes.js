const express = require("express");
const processingsFeesRouter = express.Router();
const {
    addProcessingFeesController,
    fetchProcessingFeesController,
    updateProcessingFeesController,
    deleteProcessingFeesController
} = require("../controllers/processing.controllers.js");
const { userAuthentication } = require("../middleware/auth.middleware.js");

// Route to add processing fees
processingsFeesRouter.route("/add").post(userAuthentication, addProcessingFeesController);

// Route to fetch all processing fees
processingsFeesRouter.route("/fetch").get(userAuthentication, fetchProcessingFeesController);

// Route to update processing fees by ID
processingsFeesRouter.route("/update/:id").put(userAuthentication, updateProcessingFeesController);

// Route to delete processing fees by ID
processingsFeesRouter.route("/delete/:id").delete(userAuthentication, deleteProcessingFeesController);

module.exports = processingsFeesRouter;