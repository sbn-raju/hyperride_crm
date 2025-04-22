const { pool } = require("../database/db.connect.js");
const generateSignature = require("../helpers/generateApiSignature.js");
const generateVerificationId = require("../helpers/generateVerificatioId.js");
const cashfreeUrl = require("../helpers/BaseURL.js");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment-timezone");
const encryptData = require("../helpers/encrypter.js");
const decryptData = require("../helpers/decrypter.js");
const otpGenerator = require("../helpers/otpGenerator.js");
const customerRoute = require("../routes/customers.routes.js");
const { putObjectsS3Function } = require("../services/s3Connect.services.js");
const BASEURL = require("../helpers/selfUrl.js");

const getCustomersControllers = async (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  try {
    // Count total customers
    const countResult = await pool.query('SELECT COUNT(*) FROM customer_registration');
    const totalCount = parseInt(countResult.rows[0].count);

    // Get paginated customers
    const customersResult = await pool.query(
      `SELECT * FROM customer_registration ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, (page - 1) * limit]
    );

    res.status(200).json({
      data: customersResult.rows,
      totalCount
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const serchGetCustomers = async (req, res) => {
  let { query = '', page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  try {
    const searchTerm = `%${query}%`;

    const searchCondition = `
      WHERE user_name :: text ILIKE $1
      OR user_mobile :: text ILIKE $1
      OR user_address :: text ILIKE $1
      OR user_alt_no :: text ILIKE $1
    `;

    // Count matching records
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM customer_registration ${searchCondition}`,
      [searchTerm]
    );
    const totalCount = parseInt(countResult.rows[0].count);

    // Fetch matching paginated results
    const customersResult = await pool.query(
      `SELECT * FROM customer_registration ${searchCondition}
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [searchTerm, limit, (page - 1) * limit]
    );

    res.status(200).json({
      data: customersResult.rows,
      totalCount
    });
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



//This is to get the single customer details.
const getCustomerControllers = async (req, res) => {
  //Getting the customer id from the query.
  const { customer_id } = req.query;

  //Validation Check.
  if (!customer_id) {
    return res.status(400).json({
      success: false,
      message: "Customer Id is required",
    });
  }

  //Query to get all the customers from the database.
  const getCustomersQuery = "SELECT * FROM customer_registration WHERE id = $1";
  try {
    const getCustomersResult = await pool.query(getCustomersQuery, [
      customer_id,
    ]);

    if (getCustomersResult.rowCount != 0) {
      //Getting the encrypted aadhaar number.
      const aadhaar_number = getCustomersResult?.rows[0]?.user_adhaar_number;

      //Decrypting the aadhaar number.
      const decryptedAdhaarNumber = await decryptData(aadhaar_number);

      //Getting the Profile which is in binary and converting it into the string and then sending it to the frontend.
      const userProfile = getCustomersResult?.rows[0]?.user_profile;

      console.log(userProfile);

      if (!userProfile) {
        throw new Error("Error in finding the user profile picture");
      }

      //Getting the original user profile picture.
      const getUserProfile = Buffer.from(userProfile, "base64").toString(
        "base64"
      );

      //construct the final data.
      const finalData = {
        data: {
          ...getCustomersResult.rows[0],
          user_adhaar_number: decryptedAdhaarNumber,
        },
        user_profile: getUserProfile,
      };

      return res.status(200).json({
        success: true,
        data: finalData,
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

//This API will get the user Last booking Date.
const getLastTransactionsDate = async (req, res) => {
  //Getting the user's id from query;
  const { customer_id } = req.query;

  //Validation Check.
  if (!customer_id) {
    return res.status(400).json({
      success: false,
      message: "Customer Id is not present",
    });
  }

  //Query to fetching the latest date of transcation.
  const getOneQuery =
    "SELECT MAX(created_at) AS last_booking_date FROM bookings WHERE customer_id = $1";
  const getOneValue = [customer_id];

  //Fetching the lastest date from the database.
  try {
    const getOneResult = await pool.query(getOneQuery, getOneValue);
    if (getOneResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: getOneResult.rows[0],
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

//This API will verify the driving liences.
const getCustomerDrivingLicencesControllers = async (req, res) => {
  //Getting the user driving details from the Body.
  const { customer_id, dl_number, dob } = req.body;
  console.log("This is the customer driving license details", dob, dl_number);

  //Call the function to generate the signature for the request.
  const signature = await generateSignature();

  //Call the function to generate the verifation for the request.
  const verificationId = await generateVerificationId();

  //Getting the user_id from the middleware.
  const admin_id = req.user.id;

  //Validation check for this the details.
  if (!verificationId || !signature || !dob || !dl_number || !customer_id) {
    return res.status(400).json({
      success: false,
      message: "Check the data",
    });
  }

  //Converting the Date of Birth to the YYYY-MM-DD fromate.
  const dateOfBirth = moment.utc(dob).tz("Asia/Kolkata").format("YYYY-MM-DD");

  //Get the client details from the env.
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;

  //Make the date for the request.
  const requestData = {
    verification_id: verificationId,
    dl_number: dl_number,
    dob: dateOfBirth,
  };

  //Headers Data.
  const headerData = {
    "Content-Type": "application/json",
    "x-client-id": clientId,
    "x-client-secret": clientSecret,
    "x-cf-signature": signature,
  };

  try {
    const response = await fetch(`${cashfreeUrl}/driving-license`, {
      method: "POST",
      headers: {
        ...headerData,
        "Content-Length": Buffer.byteLength(JSON.stringify(requestData)),
      },
      body: JSON.stringify(requestData),
    });

    console.log(JSON.stringify(requestData));

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        message: await response.json(),
      });
    } else {
      //Fetching the details of the user driving licences.
      const data = await response.json();

      console.log(data);

      //Fetching the details from the data got from the cashfree.
      const status = data.status;
      const name = data.details_of_driving_licence.name;
      const doi = data.details_of_driving_licence.date_of_issue;
      const photo = data.details_of_driving_licence.photo;
      const address = data.details_of_driving_licence.address;

      //Adding details of the driving licences in the database.
      const addDrivingLicenseQuery =
        "INSERT INTO driving_license (customer_id, verification_id, dl_number, status, holder_name, date_of_issue, dob, photo, address_line, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id";

      const addDrivingLicenseValue = [
        customer_id,
        verificationId,
        dl_number,
        status,
        name,
        doi,
        dob,
        photo,
        address,
        admin_id,
        admin_id,
      ];

      const addDrivingLicenseResult = await pool.query(
        addDrivingLicenseQuery,
        addDrivingLicenseValue
      );

      if (addDrivingLicenseResult.rowCount != 0) {
        return res.status(200).json({
          success: true,
          message: "Driving license added successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`,
    });
  }
};

//This API will the details of the Driving license.
const getDrivingLicenseControllers = async (req, res) => {
  //Getting the customers id from the query.
  const { customer_id } = req.query;

  const getDrivingLicenseQuery =
    "SELECT verification_id, dl_number, status, holder_name, date_of_issue, dob, photo, address_line FROM driving_license WHERE customer_id = $1";
  const getDrivingLicenseValue = [customer_id];

  try {
    const getDrivingLicenseResult = await pool.query(
      getDrivingLicenseQuery,
      getDrivingLicenseValue
    );

    if (getDrivingLicenseResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: getDrivingLicenseResult.rows[0],
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Customer does't have the driving license",
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

//This API will trigger the Aadhar Card OTP.
const triggerAadharOtpController = async (req, res) => {
  // //Get the Aadhar number and the id from the body.
  const { aadhaar_number } = req.body;

  //Getting the Signature from the function to verification.
  const signature = await generateSignature();

  //Getting the Client details form the env file.
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  
  //Verification check
  if (!aadhaar_number || !signature || !clientId || !clientSecret) {
    return res.status(400).json({
      success: false,
      message: "Re-check the data",
    });
  }

  //Data for the body;
  const data = {
    aadhaar_number: aadhaar_number,
  };

  //Headers Data.
  const headerData = {
    "Content-Type": "application/json",
    "x-client-id": clientId,
    "x-client-secret": clientSecret,
    "x-cf-signature": signature,
  };

  try {
    const response = await fetch(`${cashfreeUrl}/offline-aadhaar/otp`, {
      method: "POST",
      headers: headerData,
      body: JSON.stringify(data),
    });
    console.log(aadhaar_number,clientId,clientSecret,signature);
    
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        date: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        date: result,
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

//This API will Verify the OTP which is sent to the user.
const verifyAadhaarOtpController = async (req, res) => {
  //Getting the OTP and reference number to verify.
  const { ref_id, otp, aadhaar_number } = req.body;
console.log(ref_id,otp,aadhaar_number);

  //Getting the signature from the function to verify.
  const signature = await generateSignature();

  //Getting the client details from the env file.
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;

  //Getting the details from the middleawae.
  const admin_id = 5;

  //Validation check.
  if (
    !signature ||
    !clientId ||
    !clientSecret ||
    !otp ||
    !ref_id ||
    !aadhaar_number ||
    !admin_id
  ) {
    return res.status(400).json({
      success: false,
      message: "Re-check the Data",
    });
  }

  //Encrypt the Aadhaar Number.
  const encryptedAadhaarNumber = await encryptData(aadhaar_number);

  //Make the data for the request.
  const requestData = {
    otp: otp,
    ref_id: ref_id,
  };

  //Headers Data.
  const headerData = {
    "Content-Type": "application/json",
    "x-client-id": clientId,
    "x-client-secret": clientSecret,
    "x-cf-signature": signature,
  };

  try {
    const response = await fetch(`${cashfreeUrl}/offline-aadhaar/verify`, {
      method: "POST",
      headers: headerData,
      body: JSON.stringify(requestData),
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      //Get the Details of the Aadhaar card from the API.
      const base64String = result?.photo_link;
      const holder_name = result?.name;
      const status = result?.status;
      const gender = result?.gender;
      const dob = result?.dob;
      const address = result?.address;
      const care_of = result?.care_of;
      const pincode = result?.split_address?.pincode;
      const full_address = `${address}, ${pincode}`;

      //Splitting the photolink into two such that we only store the desired link.
      const splitString = base64String.split(",")[1];

      //Converting the Base 64 String into the Buffer.
      const bufferPhotoString = Buffer.from(base64String, "base64");
      console.log(bufferPhotoString);

      //Setting the isverified to true is the status of the aadhar is true.
      const isVerified = status === "VALID" ? true : false;

      //Adding the data into the database.
      const addCustomerDataQuery =
        "INSERT INTO customer_registration (user_name, user_adhaar_number, aadhar_isverified, user_address, user_profile, user_gender, user_dob, user_status, user_care_of, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id";

      const addCustomerDataValue = [
        holder_name,
        encryptedAadhaarNumber,
        isVerified,
        full_address,
        bufferPhotoString,
        gender,
        dob,
        status,
        care_of,
        admin_id,
        admin_id,
      ];

      //Query to hit the datbase to save the data.
      const addCustomerDataResult = await pool.query(
        addCustomerDataQuery,
        addCustomerDataValue
      );

      if (addCustomerDataResult.rowCount != 0) {
        return res.status(200).json({
          success: true,
          message: "Aadhaar details added successfully",
          user_id: addCustomerDataResult.rows[0]?.id,
          user_name: holder_name,  // Send the name to frontend
          user_address: full_address,  // Send the address to frontend
        });
      }
       else {
        return res.status(400).json({
          success: false,
          message: "Touble in adding the new Customer.",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        date: result,
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

//Adding the Customer detail like phone number, Altrnative phone number.
const triggerMobileOtpCustomerController = async (req, res) => {
  //Getting the Data from the body.
  const { user_mobile, user_alt_no } = req.body;

  //Validation Check
  if (!user_mobile || !user_alt_no) {
    return res.status(400).json({
      success: false,
      message: "Re-check the data",
    });
  }

  //Send the OTP to the mobile number.
  //Generating the OTP to the number given by the customer.
  const otp = await otpGenerator();

  //Validation Check
  if (!otp) {
    throw new Error("Error in creating the otp");
  }
};

//This is to verify the otp from the customer.
const verifyOtpCustomerController = async (req, res) => {
  //Getting the information of the.
  // const { } =
};

const updateCustomerMobileController = async (req, res) => {
  // Extract Aadhaar number, mobile number, and alternate number from request body
  const { aadhaar_number, user_mobile, user_alt_no } = req.body;
  const admin_id = 5;
  // Validation check
  if (!aadhaar_number || !user_mobile || !user_alt_no) {
    return res.status(400).json({
      success: false,
      message: "Please provide aadhaar_number, user_mobile, and user_alt_no",
    });
  }

  try {
    // Encrypt Aadhaar number before querying the database
    const encryptedAadhaarNumber = await encryptData(aadhaar_number);

    // Query to update mobile and alternate number based on encrypted Aadhaar number
    const updateCustomerQuery = `
      UPDATE customer_registration 
      SET user_mobile = $1, user_alt_no = $2, updated_by = $3
      WHERE user_adhaar_number = $4
      RETURNING *;
    `;

    const updateValues = [user_mobile, user_alt_no, admin_id, encryptedAadhaarNumber];

    const updateResult = await pool.query(updateCustomerQuery, updateValues);

    if (updateResult.rowCount !== 0) {
      return res.status(200).json({
        success: true,
        message: "Mobile number updated successfully",
        user_mobile,
        user_alt_no,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error updating mobile number:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


//This is the v2 route for image uploading.
const addCustomerImageController = async(req, res)=>{

  //Getting the image details from the request.
  const { user_id, imageDetails } = req.body;
  console.log(user_id);


 
  
  //Validation check.
  if(!user_id || !imageDetails){
    return res.status(400).json({
      success: false,
      message: "Please add the user details and image",
    })
  }

  //Adding the Image into the S3 Buckets.
  const response = await putObjectsS3Function(req?.file);
  // console.log(response);
  if(!response){
    return res.status(400).json({
      success: false,
      message: "Error is uploading the image in s3"
    })
  }


  //Global for the image details.
  let image_details = "";

  if(imageDetails === "aadhaar_front"){
    image_details = "AADHAR_FRONT"
  }else if(imageDetails === "aadhaar_back"){
    image_details = "AADHAR_BACK"
  }else if(imageDetails === "driving_front"){
    image_details = "DRIVING_FRONT"
  }else if(imageDetails === "driving_back"){
    image_details = "DRIVING_BACK"
  }else{
    return res.status(400).json({
      success: false,
      message: "Invalid Image Details"
    })
  }

  //Adding the following in the database.
  const addImageQuery = "INSERT INTO user_images (user_id, image_link, image_details) VALUES ($1, $2, $3) RETURNING *";
  const addImageValue = [user_id, response, image_details];


  try {
    const addImageResult = await pool.query(addImageQuery, addImageValue);
    if(addImageResult.rowCount != 0){
        return res.status(200).json({
          success: false ,
          message: "Image is uploaded successfully"
        });
    }
  } catch (error) {
    console.error("Error in uploading the image:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

}



//Get the customer images controller
const getCustomerImageController = async(req, res)=>{
   
  //Getting the user id from the query.
  const { user_id } = req.query;

  if(!user_id){
    return res.status(400).json({
      success: false,
      message: "User id is not found"
    })
  }

  //Get the images from the database.
  const getImagesQuery = "SELECT * FROM user_images WHERE user_id = $1";
  const getImagesValue = [user_id];

  //Try and catch block.
  try {
    const getImageResult = await pool.query(getImagesQuery, getImagesValue);

    if(getImageResult.rowCount != 0){
      return res.status(200).json({
        success: false,
        data: getImageResult.rows
      })
    }
  } catch (error) {
    console.error("Error in uploading the image:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


//This controller will update contact number and details.
const getCustomerPutContactControllers = async(req, res)=>{

  //Getting the user id and the contact numbers to update.
  // const 
}


//This controller will update the  driving licence details of the user.
const userDrivingLicenseUpdateControllers = async(req, res)=>{

  //Getting the user id from the query.
  const { customer_id, dl_number, dob } = req.body;

  //Validation Check.
  if(!customer_id){
    return res.status(400).json({
      success: false,
      message: "User Id is not present"
    })
  }

  //Query to delete the driving license.
  const deleteDrivingQuery = "DELETE FROM driving_license WHERE customer_id = $1 RETURNING id";
  const deleteDrivingValue = [ customer_id ];

  try {
    const deleteDrivingResult = await pool.query(deleteDrivingQuery, deleteDrivingValue);
    if(deleteDrivingResult.rowCount != 0){

      //Getting Tokens to the user.
      const authHeader = req.headers.authorization;
      const user_token = authHeader && authHeader.split(" ")[1];

    //Calling the internal API to save the driving licence
      const response = await fetch(`${BASEURL}/customers/fetch-driving-licence`,{
        method : "POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body:JSON.stringify({
          dl_number: dl_number,
          dob: dob,
          customer_id: customer_id
        })
      });

      if(response.ok){
        const result = await response.json();
        console.log("This is logging form update Driving licencse", result);
        return res.status(200).json({
          success: true,
          message : "Driving License Update Successfully"
       })
      }else{
        const result = await response.json();
        throw new Error(result.error || "Internal Server Error");
      }
    }
  } catch (error) {
    console.error("Error in uploading the image:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


module.exports = {
  getCustomersControllers,
  serchGetCustomers,
  getCustomerControllers,
  getCustomerDrivingLicencesControllers,
  getDrivingLicenseControllers,
  triggerAadharOtpController,
  verifyAadhaarOtpController,
  triggerMobileOtpCustomerController,
  getLastTransactionsDate,
  updateCustomerMobileController, 
  addCustomerImageController,
  getCustomerImageController,
  userDrivingLicenseUpdateControllers
};
