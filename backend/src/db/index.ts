import mongoose from "mongoose";

const DB_NAME = "constestWeb";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;

