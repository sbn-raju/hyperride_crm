const  { pool } = require('../database/db.connect.js');
const bcrypt = require("bcryptjs");

//This API will get the data of the user.
const getUserController = async(req, res)=>{

    //Getting the id from the middleware.
    const { id } = req.user;
    console.log(id);
    

    //Getting the user data from the database.
    const fetchUserQuery = "SELECT * FROM admin_registration WHERE id = $1";
    const fetchUserValue = [ id ];

    try {
        const fetchUserResult = await pool.query(fetchUserQuery, fetchUserValue);
        if(fetchUserResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: fetchUserResult.rows[0]
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "User not found"
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

//This API will get all the data of the users.
const getUsersController = async(req, res)=>{


    //Getting the user data from the database.
    const fetchUserQuery = "SELECT admin_name, admin_email, isverified, is_blocked, admin_username FROM admin_registration";

    try {
        const fetchUserResult = await pool.query(fetchUserQuery);
        if(fetchUserResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: fetchUserResult.rows
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



const updateUserController = async (req, res) => { 
    console.log(req.body);
    const { admin_name, admin_username, admin_email, admin_password } = req.body;

    //Validation wheather the name, email and password is correct or not.
    if(!admin_name || !admin_username || !admin_email){
        return res.status(400).json({
            success: false,
            message: 'Please enter all the fields'
        });
    }

    //Get the user id from the middleware.
    const { id } = req.user;


    //Changing the password to the hashed password
    let hashedPassword = "";
    if(admin_password){
     hashedPassword = await bcrypt.hash(admin_password, 10);
    }

    try {
        let response = {};
        if(hashedPassword){
            response = await pool.query(
                'UPDATE admin_registration SET admin_name = $1, admin_username = $2, admin_email = $3, admin_password = $4 WHERE id = $5',
                [admin_name, admin_username, admin_email, hashedPassword, id]
            );
        }
        else{
            response = await pool.query(
                'UPDATE admin_registration SET admin_name = $1, admin_username = $2, admin_email = $3 WHERE id = $4',
                [admin_name, admin_username, admin_email, id]
            );
        }

        return res.status(200).json({
            succes: true,
            message: "Details Updated Successfully"
        })
            
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success: false,
        message: `Internal Server Error ${error}`
       });
    }
}


module.exports = {
    getUserController,
    updateUserController,
    getUsersController
}