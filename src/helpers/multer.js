const multer = require("multer");
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
      // Destination of it where documents should be stored
      console.log("Hello this is Multer");

      //Adding the final address to the path.
      const dirPath = path.join(__dirname, "../public/vehicle/images");
  
      //Check if the directory exists, if not, create it.
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
  
      cb(null, dirPath);
  
    },
    filename: function (req, file, cb) {
        console.log(file);
      const name = req.body.vehicle_name + "_" + req.body.vehicle_number +'-' + file.originalname;
      cb(null, name)
    }
})


const upload = multer({
    storage: storage,
});

module.exports = upload