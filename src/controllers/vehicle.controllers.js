//Jai Sree Ram...!!
const { pool } = require("../database/db.connect.js");

//This API will add the vehicle into the database.
const addVehicleControllers = async (req, res) => {
  //Getting the information from the request.
  const {
    vehicle_name,
    vehicle_number,
    vehicle_color,
    engine_type,
    vehicle_category,
  } = req.body;

  //Getting the Admin id from the middleware.
  const admin_id = req.user.id;
  // const admin_id = 1;

  console.log("Vehicle Data", req.body);

  //Adding the vehicle images path to the database.
  const vehicle_image = req.file?.path || null;
  console.log("Vehicle image", vehicle_image);

  //Validation check recieved from the frontend.
  if (
    !vehicle_name ||
    !vehicle_number ||
    !vehicle_color ||
    !engine_type ||
    !vehicle_image ||
    !vehicle_category
  ) {
    return res.status(400).json({
      success: false,
      message: "Re-check the entered data.",
    });
  }

  //Query to hit the database
  const addVehicleQuery =
    "INSERT INTO vehicle_master (vehicle_name, vehicle_number, vehicle_color, engine_type, vehicle_image, vehicle_category, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
  const addVehicleValue = [
    vehicle_name,
    vehicle_number,
    vehicle_color,
    engine_type,
    vehicle_image,
    vehicle_category,
    admin_id,
    admin_id,
  ];

  //Add the information.
  try {
    const addVehicleResult = await pool.query(addVehicleQuery, addVehicleValue);
    if (addVehicleResult.rowCount != 0) {
      return res.status(201).json({
        success: true,
        message: "Vehicle added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

//This API will make the vehicle freeze.
const freezeVehicleController = async (req, res) => {
  //Getting the vehicle id from the query.
  const { vehicle_id } = req.query;

  //Validation check.
  if (!vehicle_id) {
    return res.status(400).json({
      success: false,
      message: "Re-check the entered data.",
    });
  }

  //Adding the user id from the middleware.
  const admin_id = req.user.id;

  //Query to Freeze the vehicle into the database.
  const freezeVehicleQuery =
    "UPDATE vehicle_master SET vehicle_isfreeze = $1 , vehicle_isavailable = $2, updated_by = $3 WHERE id = $4";
  const freezeVehicleValue = [true, false, admin_id, vehicle_id];

  //Update the information.
  try {
    const freezeVehicleResult = await pool.query(
      freezeVehicleQuery,
      freezeVehicleValue
    );

    if (freezeVehicleResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        message: "Vehicle is freezed successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

//This API will make the vehicle unfreeze.
const unfreezeVehicleController = async (req, res) => {
  //Getting the vehicle id from the query.
  const { vehicle_id } = req.query;

  //Validation check.
  if (!vehicle_id) {
    return res.status(400).json({
      success: false,
      message: "Re-check the entered data.",
    });
  }

  const admin_id = req.user.id;

  //Query to Freeze the vehicle into the database.
  const freezeVehicleQuery =
    "UPDATE vehicle_master SET vehicle_isfreeze = $1 , vehicle_isavailable = $2, updated_by = $3 WHERE id = $4";
  const freezeVehicleValue = [false, true, admin_id, vehicle_id];

  //Update the information.
  try {
    const freezeVehicleResult = await pool.query(
      freezeVehicleQuery,
      freezeVehicleValue
    );

    if (freezeVehicleResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        message: "Vehicle is unfreezed successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

const getAllVehicleControllers = async (req, res) => {
  // Extract page and limit from query parameters with defaults
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 records per page
  const offset = (page - 1) * limit; // Calculate offset for pagination

  // Query to get the total count of vehicles
  const countQuery = "SELECT COUNT(*) FROM vehicle_master";

  // Query to fetch the vehicles with limit and offset
  const getQuery = `
        SELECT * FROM vehicle_master WHERE is_delete = $1
        ORDER BY id ASC
        LIMIT $2 OFFSET $3
    `;

  try {
    // Execute the count query
    const countResult = await pool.query(countQuery);
    const totalCount = parseInt(countResult.rows[0].count, 10);

    // Execute the fetch query
    const getQueryResult = await pool.query(getQuery, [0, limit, offset]);

    // Check if vehicles are found
    if (getQueryResult.rowCount > 0) {
      return res.status(200).json({
        success: true,
        data: getQueryResult.rows,
        totalCount, // Total number of vehicles
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit), // Calculate total pages
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No vehicles found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

//This API will fetch the all the vehicles listed which are available.
const getAllAvailableVehicleControllers = async (req, res) => {

  // Extract page and limit from query parameters with defaults
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 records per page
  const offset = (page - 1) * limit; // Calculate offset for pagination
  const engineType = req.query.engine_type;
  console.log(engineType);

 
  let getQuery = "";
  let getValue = [];

  let getCountQuery = "";
  let getCountValue = [];

  // Query to fetch the vehicles with limit and offset
  if (engineType === "all") {
    getQuery = `
    SELECT id, vehicle_name, vehicle_number, engine_type, vehicle_category FROM vehicle_master WHERE vehicle_isavailable = $1 AND is_delete = $2
    ORDER BY id ASC
    LIMIT $3 OFFSET $4
`;
    getValue = [true, 0, limit, offset];

    // Query to get the total count of vehicles
    getCountQuery = "SELECT COUNT(*) FROM vehicle_master WHERE vehicle_isavailable = $1 AND is_delete = $2";
    getCountValue = [true, 0];


  } else {
    getQuery = `
    SELECT id, vehicle_name, vehicle_number, engine_type, vehicle_category FROM vehicle_master WHERE vehicle_isavailable = $1 AND is_delete = $2 AND engine_type = $3
    ORDER BY id ASC
    LIMIT $4 OFFSET $5
`;
    getValue = [true, 0, engineType, limit, offset];

    // Query to get the total count of vehicles
    getCountQuery = "SELECT COUNT(*) FROM vehicle_master WHERE engine_type = $1 AND vehicle_isavailable = $2 AND is_delete = $3";
    getCountValue = [engineType, true, 0];
  }

  try {
    // Execute the count query
    
    const countResult = await pool.query(getCountQuery, getCountValue);
    const totalCount = parseInt(countResult.rows[0].count, 10);

    // Execute the fetch query
    const getQueryResult = await pool.query(getQuery, getValue);

    // Check if vehicles are found
    if (getQueryResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: getQueryResult.rows,
        totalCount, // Total number of vehicles
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit), // Calculate total pages
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No vehicles found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

//This API will fetch the all the vehicles listed which are available.
const getSingleVehicleControllers = async (req, res) => {
  //Get the id from the query.
  const { vehicle_id } = req.query;

  //Query to get all the vehicle from the database.
  const getQuery =
    "SELECT * FROM vehicle_master WHERE id = $1 AND is_delete = $2";
  const getValue = [vehicle_id, 0];

  //Get all the information.
  try {
    const getQueryResult = await pool.query(getQuery, getValue);
    if (getQueryResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: getQueryResult.rows,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No vehicle available",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

//This API will fetch the all the vehicles listed which are available.
const getAllFrezzedVehicleControllers = async (req, res) => {
  //Query to get all the vehicle from the database.
  const getQuery =
    "SELECT * FROM vehicle_master WHERE vehicle_isavailable = $1 AND vehicle_isfreeze = $2 AND is_delete = $3";
  const getValue = [false, true, 0];

  //Get all the information.
  try {
    const getQueryResult = await pool.query(getQuery, getValue);
    if (getQueryResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: getQueryResult.rows,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No vehicles available",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

//This API will get the engine types
const getEngineTypeController = async (req, res) => {
  //Query to get the unique Engine type.
  const getEngineTypeQuery = "SELECT DISTINCT engine_type FROM vehicle_master";

  try {
    const getEngineTypeResult = await pool.query(getEngineTypeQuery);
    if (getEngineTypeResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: getEngineTypeResult.rows,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Distinct Engine Types",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

//This API will get the unique
const getVehicleCategoryController = async (req, res) => {
  //Query to get the unique Engine type.
  const getVehicleCategoryQuery =
    "SELECT DISTINCT vehicle_category FROM vehicle_master";

  try {
    const getVehicleCategoryResult = await pool.query(getVehicleCategoryQuery);
    if (getVehicleCategoryResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: getVehicleCategoryResult.rows,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Distinct Vehicle Category",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

//Geeting vehicle based on the Category and engine type.
const getEngineAndCategory = async (req, res) => {
  //Getting the vehicle category and the engine type.
  const { vehicle_category, engine_type } = req.body;

  //Validation Check.
  if (!vehicle_category || !engine_type) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }

  //Query to fetch the vehicles based on teh engine type and the vehicle type.
  const fetchVehiclesQuery =
    "SELECT id, vehicle_name, vehicle_number FROM vehicle_master WHERE engine_type = $1 AND vehicle_category = $2 AND vehicle_isavailable = $3 AND is_delete = $4";
  const ftechVehiclesValue = [engine_type, vehicle_category, true, 0];

  try {
    const fetchVehiclesResult = await pool.query(
      fetchVehiclesQuery,
      ftechVehiclesValue
    );
    if (fetchVehiclesResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: fetchVehiclesResult.rows,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Vehicle Found in this variants",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

//This below API will soft delete the vehicle details.
const deleteVehicleController = async (req, res) => {
  //Getting the id of the vehicle from the body.
  const { id } = req.body;

  //Validation check.
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required",
    });
  }

  const admin_id = req.user.id;

  //Query to delete the vehicle from the database.
  const deleteQuery =
    "UPDATE vehicle_master SET is_delete = $1, updated_by = $2 WHERE id = $3 RETURNING *";

  const deleteValues = [1, admin_id, id];

  try {
    const response = await pool.query(deleteQuery, deleteValues);
    if (response.rowCount != 0) {
      return res.status(200).json({
        success: true,
        message: "Vehicle delete successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Vehicle not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

module.exports = {
  addVehicleControllers,
  freezeVehicleController,
  unfreezeVehicleController,
  getAllVehicleControllers,
  getAllAvailableVehicleControllers,
  getSingleVehicleControllers,
  getAllFrezzedVehicleControllers,
  getEngineTypeController,
  getVehicleCategoryController,
  getEngineAndCategory,
  deleteVehicleController,
};
