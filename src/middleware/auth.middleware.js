const jwt = require("jsonwebtoken");

//This is the User Authentication
const userAuthentication = async(req, res, next)=>{

    //Getting Tokens to the user.
    const authHeader = req.headers.authorization;
    const user_token = authHeader && authHeader.split(" ")[1];


    if(!user_token){
        return res.status(403).json({
            success: false,
            message: "Authentication token required"
        }) 
    }


    //Getting the details form the token.
    try {
        const decodedUser = jwt.verify(user_token, process.env.JWT_SECRET_KEY);

        //Validation check for the decoded-user.
        if(!decodedUser){
            return res.status(401).json({
                success: false,
                message: "Invalid token: No User data found"
            })
        }

        //Getting the Decoded User.
        req.user = decodedUser;
        console.log(decodedUser)

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
