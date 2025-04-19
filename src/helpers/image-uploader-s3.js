const multer = require("multer");
const path = require('path');
const fs = require('fs');


const storage = multer.memoryStorage();


const image_uploader = multer({
    storage: storage,
});

module.exports = image_uploader