import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const authenticateWithToken=(req,res,next)=>{
    try {
         req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
        let token = req.headers.authorization.split(" ")[1];

        if(!token){
            return res.status(401).json({message:"Access Denied , token missing"})
        }
    
        jwt.verify(token,process.env.PRIVATE_KEY,(err, user)=>{
            if(err){
                return res.status(403).json({message:"You are not authorized"})
            }
            req.user=user;
            next()
        }  ) 
    } catch (error) {
        res.status(500).json("Internal server Error")
    }
}


export const authorizeRoles=(roles)=> {
    return (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Access denied, token missing' });
        }

        jwt.verify(token, 'your-secret-key', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Unauthorized access' });
            }

            req.user = user;
            next();
        });
    };
}