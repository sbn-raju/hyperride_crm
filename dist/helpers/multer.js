"use strict";

var multer = require("multer");
var path = require('path');
var fs = require('fs');
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    // Destination of it where documents should be stored
    console.log("Hello this is Multer");

    //Adding the final address to the path.
    var dirPath = path.join(__dirname, "../public/vehicle/images");

    //Check if the directory exists, if not, create it.
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, {
        recursive: true
      });
    }
    cb(null, dirPath);
  },
  filename: function filename(req, file, cb) {
    console.log(file);
    var name = req.body.vehicle_name + "_" + req.body.vehicle_number + '-' + file.originalname;
    cb(null, name);
  }
});
var upload = multer({
  storage: storage
});
module.exports = upload;