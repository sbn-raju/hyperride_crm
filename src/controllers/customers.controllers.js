const { pool } = require('../database/db.connect.js');
const generateSignature = require("../helpers/generateApiSignature.js");
const generateVerificationId = require("../helpers/generateVerificatioId.js");
const cashfreeUrl = require("../helpers/BaseURL.js");
const axios = require("axios");


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



//This API will verify the driving liences.
const getCustomerDrivingLicencesControllers = async(req, res)=>{
    

    //Getting the user driving details from the Body.
    const { customer_id, dl_number, dob} = req.body;
    
    //Call the function to generate the signature for the request.
    const signature = await generateSignature();

    //Call the function to generate the verifation for the request.
    const verificationId = await generateVerificationId();

    //Getting the user_id from the middleware.
    const admin_id = 5;

    //Validation check for this the details.
    if(!verificationId || !signature || !dob || !dl_number || !customer_id){
        return res.status(400).json({
            success: false,
            message: "Check the data"
        })
    }

    //Get the client details from the env.
    const clientId = process.env.CASHFREE_CLIENT_ID;
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;

    //Make the date for the request.
    const requestData = {
        verification_id: verificationId,
        dl_number: dl_number,
        dob: dob
    }


    //Headers Data.
    const headerData = {
        'Content-Type': 'application/json',
        'x-client-id': clientId,
        'x-client-secret': clientSecret,
        'x-cf-signature': signature,
    }

    try {
        const response = await fetch(`${cashfreeUrl}/driving-license`,{
            method: "POST",
            headers: {
                ...headerData,
                "Content-Length": Buffer.byteLength(JSON.stringify(requestData))
            },
            body: JSON.stringify(requestData)
        });

        console.log(JSON.stringify(requestData));

        if(!response.ok){
            return res.status(400).json({
                success:false,
                message: await response.json()
            })
        }else{

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
            const addDrivingLicenseQuery = "INSERT INTO driving_license (customer_id, verification_id, dl_number, status, holder_name, date_of_issue, dob, photo, address_line, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id";

            const addDrivingLicenseValue = [customer_id, verificationId, dl_number, status, name, doi, dob, photo, address, admin_id, admin_id]; 

            const addDrivingLicenseResult = await pool.query(addDrivingLicenseQuery, addDrivingLicenseValue);

            if(addDrivingLicenseResult.rowCount!=0){
                return res.status(200).json({
                    success: true,
                    message: "Driving license added successfully"
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        })
    }
}


//This API will the details of the Driving license.
const getDrivingLicenseControllers = async(req, res)=>{

    //Getting the customers id from the query.
    const { customer_id } = req.query;


    const getDrivingLicenseQuery = "SELECT verification_id, dl_number, status, holder_name, date_of_issue, dob, photo, address_line FROM driving_license WHERE customer_id = $1";
    const getDrivingLicenseValue = [customer_id];

    try {
        const getDrivingLicenseResult = await pool.query(getDrivingLicenseQuery, getDrivingLicenseValue);

        if(getDrivingLicenseResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getDrivingLicenseResult.rows[0]
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Customer does't have the driving license"
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
    getCustomerControllers,
    getCustomerDrivingLicencesControllers,
    getDrivingLicenseControllers
}