"use strict";

var express = require("express");
var _require = require("../controllers/auth.controllers.js"),
  login = _require.login,
  register = _require.register,
  triggerOtpController = _require.triggerOtpController,
  verifyOtpController = _require.verifyOtpController,
  blockUserController = _require.blockUserController;
var _require2 = require("../middleware/auth.middleware"),
  userAuthentication = _require2.userAuthentication;
var authorization = require("../middleware/autho.middleware.js");
var authRouter = express();
authRouter.route("/register").post(userAuthentication, authorization(["superAdmin"]), register);
authRouter.route("/login").post(login);

//Routes to trigger and verify the OTP.
//Triggring the otp email.
authRouter.route("/trigger-email").post(userAuthentication, authorization(["superAdmin"]), triggerOtpController);

//Verifying the OTP.
authRouter.route("/verify-otp").post(userAuthentication, authorization(["superAdmin"]), verifyOtpController);

//To Block the user.
authRouter.route("/blockuser").post(userAuthentication, authorization(["superAdmin", "conflictManager"]), blockUserController);
module.exports = authRouter;