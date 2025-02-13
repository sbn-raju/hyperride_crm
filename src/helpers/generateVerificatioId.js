const { randomUUID } = require('crypto');

//This fucntion will generate the random and unique verification id.
async function generateVerificationId(){

    //generating the UUID.
    const uuid = randomUUID();

    return uuid;
}

module.exports = generateVerificationId;