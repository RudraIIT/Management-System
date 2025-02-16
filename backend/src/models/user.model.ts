import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validtor from "validator";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    contest: mongoose.Schema.Types.ObjectId[];
    createdContest: mongoose.Schema.Types.ObjectId[];
    getJWTToken: () => string;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validtor.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false,
    },
    contest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contest",
    }],
    createdContest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contest",
    }]
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, "secret", {
        expiresIn: "30d",
    });
}

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;