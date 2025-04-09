"use strict";

var _require = require("@aws-sdk/client-s3"),
  S3Client = _require.S3Client;
var dotenv = require("dotenv");
dotenv.config();

//Connecting S3 in try an catch.
var aws_s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});
module.exports = aws_s3;