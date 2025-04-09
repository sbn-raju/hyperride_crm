"use strict";

var AWS = require("aws-sdk");
var dotenv = require("dotenv");
dotenv.config();

// //Connecting the AWS through the IAM users.
// AWS.config.update({
//    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
//    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//    region: process.env.AWS_REGION
// });

// //Making the objects for AWS.
// const aws_s3 = new AWS.S3();

// //Exporting the AWS after the connection so that it is avialable to every module.
// module.exports = {
//     aws_s3
// }