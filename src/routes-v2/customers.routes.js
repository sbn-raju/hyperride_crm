const express = require('express');
const { addCustomerImageController, getCustomerImageController } = require('../controllers/customers.controllers');
const { userAuthentication } = require('../middleware/auth.middleware');
const image_uploader = require('../helpers/image-uploader-s3');


const customerRouteV2 = express();




//Adding the image in the customer. (V2 Route)
customerRouteV2.route("/upload-image").post(image_uploader.single("image"), addCustomerImageController);

customerRouteV2.route("/get-images").get(getCustomerImageController);


module.exports = customerRouteV2;