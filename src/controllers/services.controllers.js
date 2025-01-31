const { pool } = require("../database/db.connect.js");


//This API will add the services of the new Bike.
const addServicesDetails = async(req, res)=>{

    //Get the details from the request.
    const { kilometers, previous_date, next_date } = req.body;

    //Validation check.
    if(!kilometers || !previous_date || !next_date){
        return res.status(400).json({
            success: false,
            message: "All Fields are required"
        })
    }

    //Query to add the details.
    const addServiceDetailsQuery = "INSERT INTO "
}



module.exports = {
    addServicesDetails
}