const { pool } = require("../database/db.connect.js");


//This Api will create the Addons.
const addAddonsControllers = async(req, res)=>{

    //Getting the information from the request.
    const { addons_name, addons_amount } = req.body;
    
    //Validation Check.
    if(!addons_amount || !addons_name){
        return res.status(404).json({
            success: false,
            message: "All fields are required"
        })
    }

    //Getting the id from the middleware.
    const user_id = req.user.id;

    //Adding Queries 
    const addAddonsQuery = "INSERT INTO addons (addons_name, addons_amount, created_by, updated_by) VALUES ($1, $2, $3, $4)";
    const addAddonsValues = [addons_name, addons_amount, user_id, user_id];

    try {
        const addAddonsResult = await pool.query(addAddonsQuery, addAddonsValues);
        if(addAddonsResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Addons added successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
        });
    }
}



//This API will get all the Addons from the database.
const fetchAddonsControllers = async(req, res)=>{

    const fetchAddonsQuery = "SELECT * FROM addons";

    try {
        const fetchAddonsResult = await pool.query(fetchAddonsQuery);
        if(fetchAddonsResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: fetchAddonsResult.rows
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
        });
    }
}

//This API will get the single Addons
const getSingleAddonsControllers = async(req, res)=>{

    //Getting the id from the body.
    const { id } = req.body;

    //Validation check.
    if(!id){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }


    //Query to get the single addons details.
    const getAddonsQuery = "SELECT * FROM addons WHERE id = $1";
    const getAddonsValue = [id];

    //Hitting the database.
    try {
        const getAddonsResult = await pool.query(getAddonsQuery, getAddonsValue);
        if(getAddonsResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getAddonsResult.rows[0]
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Addon not found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
        });
    }
}



//This API will update the addons
const updateAddonsController = async(req, res)=>{
    
    //Getting id and other details to update from the request.
    const { id, addons_name, addons_amount } = req.body;

    //Getting the user id from the middleware
    const user_id = req.user.id;

    //Validation check
    if(!id || !addons_amount || !addons_name || !user_id){
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        })
    }


    //Queries.
    const updateAddonsQuery = "UPDATE addons SET addons_name = $1, addons_amount = $2, updated_by = $3, updated_at = NOW() WHERE id = $4 RETURNING id"
    const updateAddonsvalues = [ addons_name, addons_amount, user_id, id];


    try {
        const updateAddonsResult = await pool.query(updateAddonsQuery, updateAddonsvalues);
        if(updateAddonsResult.rowCount != 0){
            return res.status(200).json({
                success: true, 
                message: "Updated addon successfully"
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Addon not found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
        });
    }
}


//This API will delete the single Addons
const deleteSingleAddonControllers = async(req, res)=>{

    //Getting the id from the body.
    const { id } = req.body;

    //Validation check.
    if(!id){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }


    //Query to get the single addons details.
    const getAddonsQuery = "DELETE FROM addons WHERE id = $1";
    const getAddonsValue = [id];

    //Hitting the database.
    try {
        const getAddonsResult = await pool.query(getAddonsQuery, getAddonsValue);
        if(getAddonsResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Addon delete successfully"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Addon not found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
        });
    }
}


module.exports = {
    getSingleAddonsControllers,
    addAddonsControllers,
    updateAddonsController,
    fetchAddonsControllers,
    deleteSingleAddonControllers
}