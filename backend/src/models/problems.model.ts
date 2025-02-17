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
    examples: [
        {
            input: {
                type: String,
                required: true,
                trim: true,
            },
            output: {
                type: String,
                required: true,
                trim: true,
            },
            explanation: {
                type: String,
                trim: true,
            },
        },
    ],
    constraints: [{
        type: String,
        required: true,
        trim: true,
    }],
    template: [{
        type: String,
        required: true,
        trim: true,
    }]
})

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;