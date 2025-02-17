const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

//This function encrypt the sensative data of the customer such as Aadhar Card.
const decryptData = async (data) => {
  //Get the IV and key from the env files.
  const secretKey = process.env.ENCRYPT_SECRET_KEY;
  const encryptKeyIv = process.env.ENCRYPT_IV;

  //Getting the encrypting algorithms from the env file.
  const algorithm = process.env.ENCRYPT_ALGORITHM;

  // Validate that key & IV exist
  if (!secretKey || !encryptKeyIv || !algorithm) {
    throw new Error("Missing encryption configuration. Check .env file.");
  }

  try {
    //Encrypt the data using the above data.
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secretKey, "hex"),
      Buffer.from(encryptKeyIv, "hex")
    );

    //This is the encrypted Data.
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    throw new Error("Error in decrypting the data");
  }
};

module.exports = decryptData;
