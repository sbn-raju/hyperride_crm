const express = require("express");
const { userAuthentication } = require("../middleware/auth.middleware");
const { addAddonsControllers, fetchAddonsControllers, getSingleAddonsControllers, updateAddonsController, deleteSingleAddonControllers } = require("../controllers/addons.controllers");




const addonsRoute = express();


addonsRoute.route("/add").post(userAuthentication, addAddonsControllers);

addonsRoute.route("/fetch").get(userAuthentication, fetchAddonsControllers);

addonsRoute.route("/fetch-single").get(userAuthentication, getSingleAddonsControllers);

addonsRoute.route("/updated").put(userAuthentication, updateAddonsController);

addonsRoute.route("/delete").delete(userAuthentication, deleteSingleAddonControllers);

module.exports = addonsRoute;

