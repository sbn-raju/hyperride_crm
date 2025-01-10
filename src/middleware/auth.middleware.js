const jwt = require("jsonwebtoken");

//This is the User Authentication
const userAuthentication = async(req, res, next)=>{

    //Getting Tokens to the user.
    const user_token = req.headers.cookie;
    console.log(req.headers);


    if(!user_token){
        return res.status(403).json({
            success: false,
            message: "Authentication token required"
        }) 
    }


    //Verifing initially that user token is present or not in the headers.
    if(!user_token){
        return res.status(403).json({
            success: false,
            message: "Authentication token required for User in headers."
        })
    }

    //Splitting up the Berare to get only the token string.
    const userToken = user_token.split('user_token=')[1]?.split(';')[0];
    // console.log(userToken);

    //Validation if the token is present or not.
    if(!userToken){
        return res.status(403).json({
            success: false,
            message: "Authentication token required for Vendor"
        })
    }

    //Check if the token is the vendors token or not.
    const vendorTokenVerification = user_token.split('=');
    if(vendorTokenVerification[0] != "user_token"){
        return res.status(403).json({
            success: false,
            message: "Invalid Token for User"
        })
    } 

    //Getting the details form the token.
    try {
        const decodedUser = jwt.verify(userToken, process.env.USER_JWT_TOKEN);

        //Validation check for the decoded-user.
        if(!decodedUser){
            return res.status(401).json({
                success: false,
                message: "Invalid token: No User data found"
            })
        }

        //Getting the Decoded User.
        req.user = decodedUser;

        //Carrying to the next controllers
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}` 
        })
    }

}


module.exports = {
    userAuthentication
}
