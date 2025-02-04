const express = require("express");
const { addCuponController, getAllCupons, getSingleCupons, updateCuponController, deleteSingleCouponControllers } = require("../controllers/cupons.controllers");
const { userAuthentication } = require("../middleware/auth.middleware");



const cuponRoute = express();


cuponRoute.route("/add").post(userAuthentication, addCuponController);

cuponRoute.route("/fetch").get(userAuthentication, getAllCupons);

cuponRoute.route("/fetch-single").get(userAuthentication, getSingleCupons);

cuponRoute.route("/updated").put(userAuthentication, updateCuponController);

cuponRoute.route("/delete").delete(userAuthentication, deleteSingleCouponControllers);

module.exports = cuponRoute;

