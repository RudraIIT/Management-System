import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        trim: true,
    },
    startTime: {
        type: Date,
        required: [true, "Please provide a start time"],
    },
    endTime: {
        type: Date,
        required: [true, "Please provide an end time"],
    },
    problems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Problem",
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const Contest = mongoose.model("Contest", contestSchema);

export default Contest;