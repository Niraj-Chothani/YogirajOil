// server/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Get the connection string from your .env file
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.error("Error: MONGODB_URI is not defined in your .env file");
      process.exit(1); // Exit process with failure
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI);

    console.log(`🔌 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;