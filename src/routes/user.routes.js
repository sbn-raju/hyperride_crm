const express = require('express');
const { getUserController, updateUserController, getUsersController } = require('../controllers/user.controllers.js');
const { userAuthentication } = require('../middleware/auth.middleware.js');



const userRoute = express();


userRoute.route('/get').get(userAuthentication, getUserController);
userRoute.route('/update').put(userAuthentication, updateUserController);

userRoute.route('/fetch').get(userAuthentication, getUsersController)

module.exports = userRoute;