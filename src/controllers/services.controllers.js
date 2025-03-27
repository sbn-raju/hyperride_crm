const { pool } = require("../database/db.connect.js");


//This API will add the services of the new Bike.
const addServicesDetails = async(req, res)=>{

    //Get the details from the request.
    const { vehicle_id, kilometers, service_date } = req.body;

    //Validation check.
    if(!vehicle_id || !kilometers || !service_date){
        return res.status(400).json({
            success: false,
            message: "All Fields are required"
        })
    }

    console.log(vehicle_id, kilometers, service_date)
    

    //Query to add the details.
    const addServiceDetailsQuery = "INSERT INTO services (vehicle_id, service_date, km_readings) VALUES($1, $2, $3) RETURNING id";
    const addServiceDetailsValue = [vehicle_id, service_date, kilometers];

    try {
        const addServicesDetailsResult = await pool.query(addServiceDetailsQuery, addServiceDetailsValue);
        
        if(addServicesDetailsResult.rows != 0){
            return res.status(200).json({
                success: true,
                message: "Service Details added successfully"
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Something went wrong with server"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        success: false,
        message: `Internal Server Error: ${error.message}`,
        });
    }
}




//Getting the services details of the particular vehicle.
const getVehicleServiceDetails = async(req, res)=>{

    //Getting the vehicle id form the the params.
    const id  = req.query.id;
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; 

    //Calculating the offset.
    const offset = (page - 1) * limit;

    console.log(offset, id)

    //Validation check for the id.
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Id is not present",
        })
    }


    //Getting it in the from of the limit and offset.
    //Query to fetch the details of the vehicle.
    const fetchDetailsQuery = "SELECT * FROM services WHERE vehicle_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3";
    const fetchDetailsvalue = [id, limit, offset];

    const getCountQuery = "SELECT COUNT(*) FROM services WHERE vehicle_id = $1";

    try{
        const fetchDetailsResult = await pool.query(fetchDetailsQuery, fetchDetailsvalue);
        const getCountResult = await pool.query(getCountQuery, [id]);

        const totalCount = parseInt(getCountResult.rows[0].count, 10);

        if(fetchDetailsResult.rows != 0){
            return res.status(200).json({
                success: true,
                data: fetchDetailsResult.rows,
                totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            })
        }else{
            return res.status(404).json({
                success: false,
                message: "No services data found",
              });
        }

    }catch(error){
        console.error(error);
        return res.status(500).json({
          success: false,
          message: `Internal Server Error: ${error.message}`,
        });
    }
}



module.exports = {
    addServicesDetails,
    getVehicleServiceDetails
}