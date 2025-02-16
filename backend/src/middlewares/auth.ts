import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = async(req: any,res: any,next: any) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Login first to access this resource",
        });
    }

    try {
        const decoded = jwt.verify(token, "secret");
        if (typeof decoded !== 'string' && 'id' in decoded) {
            req.user = await User.findById(decoded.id);
        } else {
            return next(new Error("Invalid token payload"));
        }

        next();
    } catch (error) {
        return next(new Error("Invalid token"));
    }
}