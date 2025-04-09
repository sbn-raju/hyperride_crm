"use strict";

var express = require('express');
var _require = require('../controllers/analytics.controllers'),
  getStatsController = _require.getStatsController;
var _require2 = require('../middleware/auth.middleware'),
  userAuthentication = _require2.userAuthentication;
var analyticsRoute = express();
analyticsRoute.route("/stats").get(userAuthentication, getStatsController);
module.exports = analyticsRoute;