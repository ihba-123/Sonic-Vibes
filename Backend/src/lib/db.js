import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Changed from MONGO_URI to MONGO_URL
    console.log("Database connect successfully!", conn.connection.host);

  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // 1 is failure and 0 is success message
  }
};

