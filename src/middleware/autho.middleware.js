//This is the middleware for the authorization of the user wheather the user is valid or not.
const authorization = (roles = []) => {
    return async(req, res, next)=>{
      
    //Getting the role from the authentication middlware;
    const { role } = req.user;

    console.log(role);
    //If the role is not present.
    if(!role){
        return res.status(403).json({
            success: false,
            message: "Access Denied: No user Role Found"
        })
    }

   try {
     //Check the role is present in the roles array or not.
     if(!roles.includes(role)){
        return res.status(403).json({
            success: false,
            message: "Access Denied: Unauthorized Role"
        })
      } 
      next();
   } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        })
   }
     }
}


// authorization(["superAdmin", "employee", "conflictManager"])


module.exports = authorization;