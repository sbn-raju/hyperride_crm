const express = require('express');
const { getStatsController } = require('../controllers/analytics.controllers');
const { userAuthentication } = require('../middleware/auth.middleware');


const analyticsRoute = express();

analyticsRoute.route("/stats").get(userAuthentication, getStatsController);


module.exports = analyticsRoute;