const { pool } = require("../database/db.connect.js");
const generateSignature = require("../helpers/generateApiSignature.js");
const generateVerificationId = require("../helpers/generateVerificatioId.js");
const cashfreeUrl = require("../helpers/BaseURL.js");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const encryptData = require("../helpers/encrypter.js");
const decryptData = require("../helpers/decrypter.js");
const otpGenerator = require("../helpers/otpGenerator.js");
const customerRoute = require("../routes/customers.routes.js");

//This is the to get all the customers.
const getCustomersControllers = async (req, res) => {
  //Add the pagination.
  //Getting the limit and offset from the query string.
  //   const { limit, offset } = req.query;

  //   //Validation check.
  //   if (!limit || !offset) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Re-check the data sent",
  //     });
  //   }

  //Query to get all the customers from the database.
  const getCustomersQuery = "SELECT * FROM customer_registration";
  try {
    const getCustomersResult = await pool.query(getCustomersQuery);
    if (getCustomersResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: getCustomersResult.rows,
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
        data: getCustomersResult.rows[0],
        user_aadhar_number: decryptedAdhaarNumber,
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
  const dateOfBirth = moment(dob).format("YYYY-MM-DD");

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
  //Get the Aadhar number and the id from the body.
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
      const bufferPhotoString = Buffer.from(splitString, "base64");
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
        });
      } else {
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

module.exports = {
  getCustomersControllers,
  getCustomerControllers,
  getCustomerDrivingLicencesControllers,
  getDrivingLicenseControllers,
  triggerAadharOtpController,
  verifyAadhaarOtpController,
  triggerMobileOtpCustomerController,
  getLastTransactionsDate
};
