const { pool } = require("../database/db.connect.js");

// Controller for fetching paginated notifications
const getPaginatedNotifications = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    // Get total count for frontend pagination
    const countResult = await pool.query("SELECT COUNT(*) FROM notification");
    const totalItems = parseInt(countResult.rows[0].count);

    // Get paginated results
    const result = await pool.query(
      "SELECT * FROM notification ORDER BY created_At DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );


    if(result.rowCount != 0){
        return res.status(200).json({
            data: result.rows,
            pagination: {
              currentPage: page,
              limit,
              totalItems,
              totalPages: Math.ceil(totalItems / limit),
            },
          });
    }

    
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ 
        message: "Server error" 
    });
  }
};



//Make the API updating the status of the notification as read.
const updateNotificationStatusController = async(req, res)=>{
   
    //Getting the booking Id from the query of the request query.
    const { booking_id } = req.query;
    
    //Validation Check.
    if(!booking_id){
        return res.status(400).json({
            success: false,
            message: "Booking Id is not present"
        })
    }

    //Query to make the update status of the real notifications.
    const statusRealQuery = "UPDATE notification SET read = $1 WHERE id = $2";
    const statusRealValue = [true, booking_id];
    
    try {
        const statusRealResult = await pool.query(statusRealQuery, statusRealValue);
        if(statusRealResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Updated the read status successfully"
            })
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ 
            message: "Server error" 
        }); 
    }
}

module.exports = {
    getPaginatedNotifications,
    updateNotificationStatusController
};