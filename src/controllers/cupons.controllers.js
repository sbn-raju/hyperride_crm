const { pool } = require("../database/db.connect.js");



//This API will add the cupons to the database.
const addCuponController = async(req, res)=>{

    //This API will get the data of the cupons.
    const { cupon_code, cupon_amount, cupon_type } = req.body;
 
    //Validation Check
    if(!cupon_amount || !cupon_code || !cupon_type){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    //Get id from the middleware.
    const { id } = req.user;
    
    //Queries.
    const addCuponQuery = "INSERT INTO cupons (cupon_code, cupon_discount_rate, cupon_type, created_by, updated_by) VALUES ($1, $2, $3, $4, $5)"
    const addCuponValue = [cupon_code, cupon_amount, cupon_type, id, id];


    //Adding the detail to the database.
    try {
        const addCuponResult = await pool.query(addCuponQuery, addCuponValue);

        if(addCuponResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Cupon added successfully"
            })
        }
    } catch (error) {
        console.log(error);
       return res.status(500).json({
        success: false,
        message: `Internal Server Error ${error}`
       });
    }
} 


//This API will get all the cupons.
const getAllCupons = async(req, res)=>{

    //Queries
    const fetchCuponsQuery = "SELECT * FROM cupons"

    try {
        const fetchCuponsResult = await pool.query(fetchCuponsQuery);

        if(fetchCuponsResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: fetchCuponsResult.rows
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
         success: false,
         message: `Internal Server Error ${error}`
        });
    }
}  


//This will the single cupon
const getSingleCupons = async(req, res)=>{

    //getting the id from the body;
    const { id } = req.body;

    //Queries
    const fetchCuponsQuery = "SELECT * FROM cupons WHERE id = $1"

    try {
        const fetchCuponsResult = await pool.query(fetchCuponsQuery, [id]);

        if(fetchCuponsResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: fetchCuponsResult.rows[0]
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Cupon not found"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
         success: false,
         message: `Internal Server Error ${error}`
        });
    }
}


const updateCuponController = async (req, res) => {
    
    // This API will update the data of the coupons.
    const { cupon_code, cupon_amount, cupon_type, cupon_id} = req.body;

    // Validation Check
    if (!cupon_code || !cupon_amount || !cupon_type || !cupon_id) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    // Get id from the middleware
    const { id } = req.user;

    // Queries
    const updateCuponQuery = `
        UPDATE cupons 
        SET cupon_discount_rate = $1, cupon_type = $2, updated_by = $3, cupon_code = $4, updated_at = NOW() 
        WHERE id = $5
    `;
    const updateCuponValue = [cupon_amount, cupon_type, id, cupon_code, cupon_id];

    // Updating the details in the database
    try {
        const updateCuponResult = await pool.query(updateCuponQuery, updateCuponValue);

        if (updateCuponResult.rowCount !== 0) {
            return res.status(200).json({
                success: true,
                message: "Cupon updated successfully",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Cupon not found",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
        });
    }
};


//This API will delete the single Addons
const deleteSingleCouponControllers = async(req, res)=>{

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
    const getAddonsQuery = "DELETE FROM cupons WHERE id = $1 RETURNING id";
    const getAddonsValue = [id];

    //Hitting the database.
    try {
        const getAddonsResult = await pool.query(getAddonsQuery, getAddonsValue);
        if(getAddonsResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Coupon delete successfully"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Coupon not found"
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
    addCuponController,
    getAllCupons,
    getSingleCupons,
    updateCuponController,
    deleteSingleCouponControllers
}