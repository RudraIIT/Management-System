import mongoose from "mongoose";


const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    difficulty: {
        type: String,
        required: true,
        trim: true,
    },
    points: {
        type: Number,
        required: true,
    },
})

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;