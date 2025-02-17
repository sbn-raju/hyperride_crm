const express = require("express");
const {login, register, triggerOtpController, verifyOtpController, blockUserController} = require("../controllers/auth.controllers.js");
const { userAuthentication } = require("../middleware/auth.middleware");
const authorization = require("../middleware/autho.middleware.js");

const authRouter = express();

authRouter.route("/register").post(userAuthentication, authorization(["superAdmin"]), register);

authRouter.route("/login").post(login);



//Routes to trigger and verify the OTP.
//Triggring the otp email.
authRouter.route("/trigger-email").post(userAuthentication, authorization(["superAdmin"]), triggerOtpController);

//Verifying the OTP.
authRouter.route("/verify-otp").post(userAuthentication, authorization(["superAdmin"]), verifyOtpController);

//To Block the user.
authRouter.route("/blockuser").post(userAuthentication, authorization(["superAdmin", "conflictManager"]), blockUserController);

module.exports = authRouter