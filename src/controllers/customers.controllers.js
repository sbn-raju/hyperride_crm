const { pool } = require('../database/db.connect.js');


const   getCustomersControllers = async(req, res)=>{

    //Query to get all the customers from the database.
    const getCustomersQuery = "SELECT * FROM customer_registration";
    try {
        const getCustomersResult = await pool.query(getCustomersQuery);
        if(getCustomersResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getCustomersResult.rows
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



const getCustomerControllers = async(req, res)=>{
     const { customer_id } = req.query;

     //Validation Check.
     if(!customer_id){
        return res.status(400).json({
            success: false,
            message: "Customer Id is required",
          }); 
     }

    //Query to get all the customers from the database.
    const getCustomersQuery = "SELECT * FROM customer_registration WHERE id = $1";
    try {
        const getCustomersResult = await pool.query(getCustomersQuery, [customer_id]);
        if(getCustomersResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getCustomersResult.rows[0]
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
    getCustomersControllers,
    getCustomerControllers
}