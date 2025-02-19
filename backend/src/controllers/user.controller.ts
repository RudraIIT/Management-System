import sendToken from "../utils/jwtToken.js";
import User from "../models/user.model.js";

export const register = async(req: any,res: any) => {
    try {
        const {username, email, password} = req.body;
        const user = await User.create({
            username,
            email,
            password,
        });

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User registration failed",
            });
        }

        sendToken(user,201,res);
    } catch (error) {
        console.log("Error in registering user",error);
    }
}

export const loginUser = async(req: any,res: any) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide an email and password",
            });
        }

        const user = await User.findOne({email}).select("+password");
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        sendToken(user,200,res);
    } catch (error) {
        console.log("Error in logging in user",error);
    }
}

export const logout = async(req: any,res: any) => {
    res.cookie("token","none",{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out",
    });
}

export const getProfile = async(req: any,res: any) => {
    try {
        const user = req.user.id;
        // don't add problems
        const userData = await User.findById(user).select("-problems");

        if(!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: userData,
        });

    } catch (error) {
        console.log("Error in getting user profile",error);
    }
}