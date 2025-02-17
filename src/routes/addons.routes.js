const express = require("express");
const { userAuthentication } = require("../middleware/auth.middleware");
const authorization = require("../middleware/autho.middleware.js");
const { addAddonsControllers, fetchAddonsControllers, getSingleAddonsControllers, updateAddonsController, deleteSingleAddonControllers } = require("../controllers/addons.controllers");




const addonsRoute = express();

//Add Addons
addonsRoute.route("/add").post(userAuthentication, authorization(["superAdmin", "conflictManager"]), addAddonsControllers);

//Getting all the Addons
addonsRoute.route("/fetch").get(userAuthentication, authorization(["superAdmin", "conflictManager", "employee"]), fetchAddonsControllers);

//Getting the single cupons.
addonsRoute.route("/fetch-single").get(userAuthentication, authorization(["superAdmin", "conflictManager"]), getSingleAddonsControllers);

//Updating the Single Addon.
addonsRoute.route("/updated").put(userAuthentication, authorization(["superAdmin", "conflictManager"]), updateAddonsController);

//Delete the Single Addon.
addonsRoute.route("/delete").delete(userAuthentication, authorization(["superAdmin", "conflictManager"]), deleteSingleAddonControllers);

module.exports = addonsRoute;

