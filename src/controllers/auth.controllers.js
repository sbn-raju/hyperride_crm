const { pool } = require("../database/db.connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../helpers/mailer.js");
const otpGenerator = require("../helpers/otpGenerator.js");

const register = async (req, res) => {
  const { admin_name, admin_username, admin_email, admin_password, admin_role } = req.body;

  //Getting the admin id.
  const  admin_id  = req.user?.id;

  //Validation wheather the name, email and password is correct or not.
  if (!admin_name || !admin_username || !admin_email || !admin_password || !admin_id) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the fields",
    });
  }

  //Checking is the user already Exists or not
  const fetchUserQuery =
    "SELECT id FROM admin_registration WHERE admin_username = $1";
  const fetchUserValues = [admin_username];

  //Changing the password to the hashed password
  const hashedPassword = await bcrypt.hash(admin_password, 10);
  try {
    const user = await pool.query(fetchUserQuery, fetchUserValues);

    if (user.rowCount != 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const response = await pool.query(
        "INSERT INTO admin_registration (admin_name, admin_username, admin_email, admin_password, role, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [admin_name, admin_username, admin_email, hashedPassword, admin_role, admin_id, admin_id]
      );

      if (response.rowCount != 0) {
        return res.status(200).json({
          succes: true,
          message: "User Resgistered Successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};

//This below API will login in the register.
const login = async (req, res) => {
  //Getting all the information the user from the frontend.
  const { admin_email, password } = req.body;

  //Validation Check
  if (!admin_email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please check all your fields",
    });
  }

  //Checking in the database whater the user exists or not.
  const fetchUserQuery =
    "SELECT * FROM admin_registration WHERE admin_email = $1 AND isverified = $2 AND is_blocked = $3";
  const fetchUserValue = [admin_email, true, false];

  //If the user exists then make sure that he enters the correct password.
  try {
    const fetchUserResult = await pool.query(fetchUserQuery, fetchUserValue);

    if (fetchUserResult.rowCount != 0) {
      //This will run onlu if the user exists.
      //Second steps is to compare the passwords.
      const user = fetchUserResult.rows[0];
      console.log(fetchUserResult.rows);

      const isMatch = await bcrypt.compare(password, user.admin_password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      //construct the user data.
      const userData = {
        id: user.id,
        username: user.admin_username,
        role: user.role,
      };

      // Generate JWT token
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.status(200).cookie('hypr', token, {
        httpOnly: true, 
        secure: false,
        sameSite: 'lax', 
        maxAge: 24 * 60 * 60 * 1000   
      }).json({
        success: true,
        message: "Login successful",
        data: {
          userEmail: user.admin_email,
          userRole: user.role
        },
        token: token,
      });
    } else {
      //This will run if the user does not exisits.
      return res.status(400).json({
        success: false,
        message: "User not Found",
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



//This API will trigger the API Which will send the otp to super admin's email.
const triggerOtpController = async (req, res) => {
  //Getting the admin email to which we need to trigger the otp againts.
  const { admin_email } = req.body;
  console.log(req.body);

  //Getting the admin who is doing the operation of verification from the middleware.
  const user_id = req.user.id;

  //Validation check.
  if (!admin_email) {
    return res.status(400).json({
      success: false,
      message: "Invalid Admin User",
    });
  }

  //Genetrating OTPs.
  const oneTimePass = await otpGenerator();

  //Generating the expiry time.
  const now = new Date(); // Get the current date and time
  const expiryTime = new Date(now.getTime() + 5 * 60 * 1000); // Add 5 minutes to the current time

  //Queries to verify the result.
  const triggerOtpQuery =
    "UPDATE admin_registration SET otp = $1, otp_expired = $2, updated_by = $3, otp_used = $4 WHERE admin_email = $5 RETURNING id";
  const triggerOtpValue = [oneTimePass, expiryTime, user_id, false, admin_email];

  try {
    const triggerOtpResult = await pool.query(triggerOtpQuery, triggerOtpValue);

    if (triggerOtpResult.rowCount != 0) {
      const subject = "New Admin Onboarding";
      const content = `The OTP for verifying the addition of a new admin is <strong>${oneTimePass}</strong>. <br/>This OTP will get expired in next 5 mins.`;

      await mailSender(subject, content);

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully to the Super Admin.",
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



//This API will verify the OTP and will status of is verified to true.
const verifyOtpController = async (req, res) => {
  //Getting the informtiion of the admin.
  const { admin_email, otp } = req.body;

  console.log(req.body);

  //Validation check.
  if (!admin_email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid Admin",
    });
  }

  //Getting the query to find the user and the otp saved in the database.
  const getOtpQuery =
    "SELECT otp, otp_expired, otp_used FROM admin_registration WHERE admin_email = $1";
  const getOtpvalue = [admin_email];

  try {
    const getOtpResult = await pool.query(getOtpQuery, getOtpvalue);

    if (getOtpResult.rowCount != 0) {
      const OneTimePass = getOtpResult.rows[0];
      console.log(OneTimePass);

      //Get the present datetime;
      const now = new Date();
      if (now <= OneTimePass.otp_expired && parseInt(otp) === OneTimePass.otp && !OneTimePass.otp_used) {
        const udpateStatus = await pool.query(
          "UPDATE admin_registration SET isverified = $1, otp_used = $2 WHERE admin_email = $3",
          [true, true, admin_email]
        );
        if (udpateStatus.rowCount != 0) {
          return res.status(200).json({
            success: true,
            message: "New Admin is verified",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "OTP is expired, invalid or Used",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};


//This API will block the access of the user to access te 
const blockUserController = async(req, res)=>{

  //Getting the user_email to block the user from the dashboard.
  const { admin_email } = req.body;

  //Getting the admin_id who is bocking is.
  const admin_id = req.user.id;
  
  //Validation Check 
  if(!admin_email){
    return res.status(400).json({
      success: false,
      message: "Invalid Admin",
    });
  }


  //Query to block the username
  const blockUserQuery = "UPDATE admin_registration SET is_blocked = $1, blocked_by = $2 WHERE admin_email = $3";
  const blockUserValue = [true, admin_id, admin_email];

  try {
    const blockUserResult = await pool.query(blockUserQuery, blockUserValue);
    if(blockUserResult.rowCount != 0){
      return res.status(200).json({
        success: true,
        message: "Admin user is block successfully"
      })
    }else{
      return res.status(400).json({
        success: false,
        message: "Admin not found"
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
  register,
  login,
  triggerOtpController,
  verifyOtpController,
  blockUserController
};
