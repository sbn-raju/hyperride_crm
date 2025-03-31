const { pool } = require("../database/db.connect.js");



//This Controller will add the processing fees.
const addProcessingFeesController = async(req, res)=>{
    
    //Getting the fees from the request body.
    const { processing_fees } = req.body;

    //Getting the admin id.
    const admin_id = req.user.id;    
    
    //Validation check.
    if(!processing_fees){
        return res.status(200).json({
            success: false,
            message: "Processing Fees is not present"
        })
    }

    //Query to make the insertation call.
    const addProcessingFeesQuery = "INSERT INTO processing_fees (process_fees, created_by) VALUES ($1, $2)";
    const addProcessingFeesValues = [processing_fees, admin_id];

    try {
        const addProcessingFeesResult = await pool.query(addProcessingFeesQuery, addProcessingFeesValues);
        if(addProcessingFeesResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Processing Fees added successfully"
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


//This Controller will fetch the processing from database.
const fetchProcessingFeesController = async (req, res) => {
    try {
        const fetchProcessingFeesQuery = "SELECT * FROM processing_fees";
        const fetchProcessingFeesResult = await pool.query(fetchProcessingFeesQuery);

        return res.status(200).json({
            success: true,
            data: fetchProcessingFeesResult.rows
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        });
    }
};

// Update Processing Fees
const updateProcessingFeesController = async (req, res) => {
    const { processing_fees } = req.body;
    const { id } = req.params;

    if (!processing_fees) {
        return res.status(200).json({
            success: false,
            message: "Processing Fees is not present"
        });
    }

    const updateProcessingFeesQuery = "UPDATE processing_fees SET process_fees = $1 WHERE id = $2";
    const updateProcessingFeesValues = [processing_fees, id];

    try {
        const updateProcessingFeesResult = await pool.query(updateProcessingFeesQuery, updateProcessingFeesValues);
        if (updateProcessingFeesResult.rowCount != 0) {
            return res.status(200).json({
                success: true,
                message: "Processing Fees updated successfully"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        });
    }
};


// Delete Processing Fees
const deleteProcessingFeesController = async (req, res) => {
    const { id } = req.params;

    const deleteProcessingFeesQuery = "DELETE FROM processing_fees WHERE id = $1";
    const deleteProcessingFeesValues = [id];

    try {
        const deleteProcessingFeesResult = await pool.query(deleteProcessingFeesQuery, deleteProcessingFeesValues);
        if (deleteProcessingFeesResult.rowCount != 0) {
            return res.status(200).json({
                success: true,
                message: "Processing Fees deleted successfully"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        });
    }
};

module.exports = {
    addProcessingFeesController,
    fetchProcessingFeesController,
    updateProcessingFeesController,
    deleteProcessingFeesController
};
