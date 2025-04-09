"use strict";

var express = require('express');
var _require = require('../controllers/user.controllers.js'),
  getUserController = _require.getUserController,
  updateUserController = _require.updateUserController,
  getUsersController = _require.getUsersController;
var _require2 = require('../middleware/auth.middleware.js'),
  userAuthentication = _require2.userAuthentication;
var userRoute = express();
userRoute.route('/get').get(userAuthentication, getUserController);
userRoute.route('/update').put(userAuthentication, updateUserController);
userRoute.route('/fetch').get(userAuthentication, getUsersController);
module.exports = userRoute;