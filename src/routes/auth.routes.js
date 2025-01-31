const express = require("express");
const {login, register, triggerOtpController, verifyOtpController, blockUserController} = require("../controllers/auth.controllers.js");
const { userAuthentication } = require("../middleware/auth.middleware");

const authRouter = express();

authRouter.route("/register").post(register);

authRouter.route("/login").post(login);



//Routes to trigger and verify the OTP.
authRouter.route("/trigger-email").post(userAuthentication, triggerOtpController);

authRouter.route("/verify-otp").post(userAuthentication, verifyOtpController);

authRouter.route("/blockuser").post(userAuthentication, blockUserController);

module.exports = authRouter