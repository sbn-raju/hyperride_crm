const { ListBucketsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../aws/s3-config.js");
const fs = require("fs");
const path = require('path');


//This functions Checks the connection with the S3 Buckets.
const checkS3Connection = async () => {
  try {
    const command = new ListBucketsCommand();
    const response = await s3.send(command);
    console.log("Connected to S3 Buckets:", response.Buckets.map(b => b.Name));
    return true;
  } catch (err) {
    console.error("S3 connection error:", err.message);
    return false;
  }
};


//This functions uploads the files to the S3 cloud.
const putObjectsS3Function = async(filePath, key)=>{
    try {
        const fileStream = fs.createReadStream(filePath);
    
        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key, 
          Body: fileStream,
          ACL: "private" 
        };
    
        const command = new PutObjectCommand(uploadParams);
        const result = await s3.send(command);
        console.log("File uploaded successfully:", result);
        return result;
      } catch (err) {
        console.error("Upload error:", err.message);
        throw err;
      }
}

module.exports = {
    checkS3Connection,
    putObjectsS3Function
}
