// server/config/db.js
import mongoose from 'mongoose';

// 1. Define a global cache object for the connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Get the connection string from your .env file
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error("Error: MONGODB_URI is not defined in your environment.");
    // In serverless, it's safer to just return an error and let the caller handle it,
    // rather than exiting the process which might be problematic in a function-as-a-service model.
    throw new Error("MONGODB_URI is not defined.");
  }

  // 2. Check if the connection is already cached
  if (cached.conn) {
    console.log("⚡️ Using existing MongoDB connection.");
    return cached.conn;
  }

  // 3. If there's no pending promise, create one
  if (!cached.promise) {
    console.log("🔌 Creating new MongoDB connection...");
    cached.promise = mongoose.connect(mongoURI).then((mongoose) => {
      return mongoose;
    });
  }

  // 4. Await the promise and cache the connection
  try {
    cached.conn = await cached.promise;
    console.log(`✅ MongoDB Connected: ${cached.conn.connection.host}`);
    return cached.conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Clear the promise so the next call tries again
    cached.promise = null;
    throw error; 
  }
};

export default connectDB;
