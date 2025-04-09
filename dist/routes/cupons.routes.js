"use strict";

var express = require("express");
var _require = require("../controllers/cupons.controllers"),
  addCuponController = _require.addCuponController,
  getAllCupons = _require.getAllCupons,
  getSingleCupons = _require.getSingleCupons,
  updateCuponController = _require.updateCuponController,
  deleteSingleCouponControllers = _require.deleteSingleCouponControllers;
var _require2 = require("../middleware/auth.middleware"),
  userAuthentication = _require2.userAuthentication;
var cuponRoute = express();
cuponRoute.route("/add").post(userAuthentication, addCuponController);
cuponRoute.route("/fetch").get(userAuthentication, getAllCupons);
cuponRoute.route("/fetch-single").get(userAuthentication, getSingleCupons);
cuponRoute.route("/updated").put(userAuthentication, updateCuponController);
cuponRoute.route("/delete")["delete"](userAuthentication, deleteSingleCouponControllers);
module.exports = cuponRoute;