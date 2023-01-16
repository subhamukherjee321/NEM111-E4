let key = "subha"
const jwt = require("jsonwebtoken")
const authenticator = (req,res,next)=> {
    const token = req.headers.auth;
    try {
        if(token){
            const decoded = jwt.verify(token, key);
            if(decoded){
                req.body.userID = decoded.id; 
                next()
            }else{
                res.send({message:"Login again"});
            }
        }else{
            res.send({message:"Login First"});
        }
        
    } catch (err) {
        console.log(err.message);
        res.send({message:"Login First"});
    }
}

module.exports = authenticator;