import JWT from "jsonwebtoken";
import userModel from "../models/userModels.js"

//USER Auth
export const isAuth = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No Token Provided" });
        }
        const token = authHeader.split(" ")[1];
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData._id)
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: User Not Found" });
    }

    next();
} catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid Token", error: error.message });
}
                                                                                                                                        
};

//ADMI Auth
export const isAdmin = async(req, res, next) =>{
    if(req.user.role !== "admin"){
        return res.status(403).json({
            message:'admin only'
        });
    }
    next();
}