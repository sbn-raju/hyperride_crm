const { pool } = require("../database/db.connect.js");

const addRentalController = async (req, res) => {
  //Getting all the information from the request.
  const { rental_name, rental_description, rental_time, rental_rate, rental_category } =
    req.body;

  //Getting the information from the middleware.
  const admin_id = req.user.id;

  //Validation check
  if (
    !rental_name ||
    !rental_description ||
    !rental_time ||
    !rental_rate ||
    !admin_id ||
    !rental_category
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const query = `
            INSERT INTO rentals_plan (rental_name, rental_description, rental_time, rental_rate, rental_category, created_by, updated_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
    const values = [
      rental_name,
      rental_description,
      rental_time,
      rental_rate,
      rental_category,
      admin_id,
      admin_id
    ];

    const result = await pool.query(query, values);
    if (result.rowCount != 0) {
      return res.status(201).json({
        success: false,
        message: "Rental plan created successfully",
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

const fetchAllRentalController = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rentals_plan ORDER BY id ASC");
    if (result.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: result.rows,
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

const getRentalcontroller = async (req, res) => {
  const { id } = req.params;

  //Validation check
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const result = await pool.query("SELECT * FROM rentals_plan WHERE id = $1;", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rental not found." });
    }
    return res.status(201).json({
      success: false,
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};

const getRentalCategory = async(req, res)=>{

  //Query to get rental category according to the.
   const query = "SELECT DISTINCT rental_category FROM rentals_plan"

   try {
    const response = await pool.query(query);
    if(response.rowCount != 0){
      return res.status(200).json({
        success: true, 
        data: response.rows
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


const getRentalPlanOnCategory = async(req, res)=>{
  const { rental_category } = req.body;

  //Validation check
  if (!rental_category) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const result = await pool.query("SELECT * FROM rentals_plan WHERE rental_category = $1;", [
      rental_category,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rental not found." });
    }
    return res.status(200).json({
      success: false,
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
}

const updateRentalController = async (req, res) => {
  const {
    id,
    rental_name,
    rental_description,
    rental_time,
    rental_rate,
  } = req.body;


  const admin_id = req.user.id;

  // Check if all fields are provided
  if (
    !id ||
    !rental_name ||
    !rental_description ||
    !rental_time ||
    !rental_rate 
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const query = `
            UPDATE rentals_plan
            SET rental_name = $1,
                rental_description = $2,
                rental_time = $3,
                rental_rate = $4,
                updated_by = $5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *;
        `;
    const values = [
      rental_name,
      rental_description,
      rental_time,
      rental_rate,
      admin_id,
      id,
    ];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rental not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Rental Plan Updated Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};


const deleteRentalController = async(req, res)=>{
    const { id } = req.body;
    try {
        const result = await pool.query('DELETE FROM rentals_plan WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res
        .status(404)
        .json({ success: false, message: "Rental not found." });
        }
        return res.status(200).json({ message: 'Rental deleted successfully.' });
    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
    }
}


module.exports = {
    addRentalController,
    getRentalcontroller,
    fetchAllRentalController,
    updateRentalController,
    deleteRentalController,
    getRentalCategory,
    getRentalPlanOnCategory
}
