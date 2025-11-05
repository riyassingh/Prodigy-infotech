import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        if (!process.env.DATABASE_URI) {
            throw new Error("DATABASE_URI is not defined in .env file");
        }

        await mongoose.connect(process.env.DATABASE_URI);

        console.log(" MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
