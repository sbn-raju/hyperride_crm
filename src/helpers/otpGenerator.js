const otpGenerator = async() =>{
    //The variable maxOtpDigit is the maximum possible digit can be generated. 
    const maxOtpDigit = 99999;

    //The variable minOtpDigit is the maximum possible digit can be generated.
    const minOtpDigit = 10000;

    //Generating the four digits OTP
    const fourDigits = Math.floor(minOtpDigit + Math.random() * maxOtpDigit)

    //Returning the OTP
    return fourDigits;
}


module.exports = otpGenerator