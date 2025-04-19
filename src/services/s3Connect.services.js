const { ListBucketsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../aws/s3-config.js");
const path = require('path');
const { randomUUID } = require("crypto");


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
const putObjectsS3Function = async(file, folder = "uploads")=>{

  const fileExt = path.extname(file.originalname); // e.g., .png
  const uniqueName = `${folder}/${randomUUID()}${fileExt}`; // e.g., uploads/abc-123.png

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: uniqueName,
    Body: file.buffer, 
    ContentType: file.mimetype,
    // ACL: "public-read", // Or 'private' if you don’t want it public
  };
try {
  
  const command = new PutObjectCommand(uploadParams);
 await s3.send(command);

  const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueName}`;
  return fileUrl;

} catch (error) {
  console.log(error);
  return error
}
}

module.exports = {
    checkS3Connection,
    putObjectsS3Function
}
