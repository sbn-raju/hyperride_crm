const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto');


//Getting the details of the credintials from the dotnev file and integeratng it to make the signature.
async function generateSignature(){

    //Getting the Client id and the public key to make the signature.
    const clientId = process.env.CASHFREE_CLIENT_ID;
    const publicKey = process.env.CASHFREE_PUBLIC_KEY;


    //Get the UNIX timestamp from the current timepstamp.
    const unixTimestamp = Math.floor(Date.now() / 1000);


    //Creating the string to encrypt using the Mentioned algorthms.
    const dataKey = `${clientId}.${unixTimestamp}`;
    
    
    const encryptBuffer = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        },
        Buffer.from(dataKey, 'utf8')
    );


    return encryptBuffer.toString('base64');
};

module.exports = generateSignature