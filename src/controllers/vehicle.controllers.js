//Jai Sree Ram...!!
const { pool } = require("../database/db.connect.js");


//This API will add the vehicle into the database.
const addVehicleControllers = async(req, res)=>{

    //Getting the information from the request.
    const { vehicle_name, vehicle_number, vehicle_color, engine_type, vehicle_category } = req.body

    //Getting the Admin id from the middleware.
    const  admin_id  = req.user.id;
    // const admin_id = 1;

    console.log("Vehicle Data", req.body);


    //Adding the vehicle images path to the database.
    const vehicle_image = req.file?.path || null;
    console.log("Vehicle image", vehicle_image)

    //Validation check recieved from the frontend.
    if(!vehicle_name || !vehicle_number ||  !vehicle_color || !engine_type || !vehicle_image ||  !vehicle_category){
        return res.status(400).json({
            success: false,
            message: "Re-check the entered data."
        })
    }
   
    //Query to hit the database
    const addVehicleQuery = "INSERT INTO vehicle_master (vehicle_name, vehicle_number, vehicle_color, engine_type, vehicle_image, vehicle_category, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const addVehicleValue = [vehicle_name, vehicle_number, vehicle_color, engine_type, vehicle_image, vehicle_category, admin_id, admin_id];

    //Add the information.
    try {
        const addVehicleResult = await pool.query(addVehicleQuery, addVehicleValue);
        if(addVehicleResult.rowCount != 0){
            return res.status(201).json({
                success: true,
                message: "Vehicle added successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        })
    }
}


//This API will make the vehicle freeze.
const freezeVehicleController = async(req, res)=>{

    //Getting the vehicle id from the query.
    const { vehicle_id } = req.query;

    //Validation check.
    if(!vehicle_id){
        return res.status(400).json({
            success: false,
            message: "Re-check the entered data."
        })
    }
    

    //Query to Freeze the vehicle into the database.
    const freezeVehicleQuery = "UPDATE vehicle_master SET vehicle_isfreeze = $1 , vehicle_isavailable = $2 WHERE id = $3";
    const freezeVehicleValue = [ true, false, vehicle_id];

    //Update the information.
    try {
        const freezeVehicleResult = await pool.query(freezeVehicleQuery, freezeVehicleValue);

        if(freezeVehicleResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Vehicle is freezed successfully"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Vehicle is not found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        }) 
    }
}


//This API will make the vehicle unfreeze.
const unfreezeVehicleController = async(req, res)=>{

    //Getting the vehicle id from the query.
    const { vehicle_id } = req.query;

    //Validation check.
    if(!vehicle_id){
        return res.status(400).json({
            success: false,
            message: "Re-check the entered data."
        })
    }
    

    //Query to Freeze the vehicle into the database.
    const freezeVehicleQuery = "UPDATE vehicle_master SET vehicle_isfreeze = $1 , vehicle_isavailable = $2 WHERE id = $3";
    const freezeVehicleValue = [ false, true, vehicle_id];

    //Update the information.
    try {
        const freezeVehicleResult = await pool.query(freezeVehicleQuery, freezeVehicleValue);

        if(freezeVehicleResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Vehicle is unfreezed successfully"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Vehicle is not found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        }) 
    }
}


//This API will fetch the all the vehicles listed.
const getAllVehicleControllers = async(req, res)=>{

    //Query to get all the vehicle from the database.
    const getQuery = "SELECT * FROM vehicle_master";
    
    //Get all the information.
    try {
        const getQueryResult = await pool.query(getQuery);
        if(getQueryResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getQueryResult.rows
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "No vehicles found" 
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        }) 
    }
}


//This API will fetch the all the vehicles listed which are available.
const getAllAvailableVehicleControllers = async(req, res)=>{

    //Query to get all the vehicle from the database.
    const getQuery = "SELECT * FROM vehicle_master WHERE vehicle_isavailable = $1";
    const getValue = [true]
    
    //Get all the information.
    try {
        const getQueryResult = await pool.query(getQuery, getValue);
        if(getQueryResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getQueryResult.rows
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "No vehicles available" 
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        }) 
    }
}


//This API will fetch the all the vehicles listed which are available.
const getSingleVehicleControllers = async(req, res)=>{

    //Get the id from the query.
    const { vehicle_id } = req.query; 

    //Query to get all the vehicle from the database.
    const getQuery = "SELECT * FROM vehicle_master WHERE id = $1";
    const getValue = [vehicle_id]
    
    //Get all the information.
    try {
        const getQueryResult = await pool.query(getQuery, getValue);
        if(getQueryResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getQueryResult.rows
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "No vehicle available" 
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        }) 
    }
}


//This API will fetch the all the vehicles listed which are available.
const getAllFrezzedVehicleControllers = async(req, res)=>{

    //Query to get all the vehicle from the database.
    const getQuery = "SELECT * FROM vehicle_master WHERE vehicle_isavailable = $1 AND vehicle_isfreeze = $2";
    const getValue = [false, true]
    
    //Get all the information.
    try {
        const getQueryResult = await pool.query(getQuery, getValue);
        if(getQueryResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getQueryResult.rows
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "No vehicles available" 
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        }) 
    }
}




module.exports = {
    addVehicleControllers,
    freezeVehicleController,
    unfreezeVehicleController,
    getAllVehicleControllers,
    getAllAvailableVehicleControllers,
    getSingleVehicleControllers,
    getAllFrezzedVehicleControllers
}