"use strict";

var express = require("express");
var _require = require("../middleware/auth.middleware"),
  userAuthentication = _require.userAuthentication;
var authorization = require("../middleware/autho.middleware.js");
var _require2 = require("../controllers/addons.controllers"),
  addAddonsControllers = _require2.addAddonsControllers,
  fetchAddonsControllers = _require2.fetchAddonsControllers,
  getSingleAddonsControllers = _require2.getSingleAddonsControllers,
  updateAddonsController = _require2.updateAddonsController,
  deleteSingleAddonControllers = _require2.deleteSingleAddonControllers;
var addonsRoute = express();

//Add Addons
addonsRoute.route("/add").post(userAuthentication, authorization(["superAdmin", "conflictManager"]), addAddonsControllers);

//Getting all the Addons
addonsRoute.route("/fetch").get(userAuthentication, authorization(["superAdmin", "conflictManager", "employee"]), fetchAddonsControllers);

//Getting the single cupons.
addonsRoute.route("/fetch-single").get(userAuthentication, authorization(["superAdmin", "conflictManager"]), getSingleAddonsControllers);

//Updating the Single Addon.
addonsRoute.route("/updated").put(userAuthentication, authorization(["superAdmin", "conflictManager"]), updateAddonsController);

//Delete the Single Addon.
addonsRoute.route("/delete")["delete"](userAuthentication, authorization(["superAdmin", "conflictManager"]), deleteSingleAddonControllers);
module.exports = addonsRoute;