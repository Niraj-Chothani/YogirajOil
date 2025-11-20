import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import allApiRoutes from './routes/index.js';

const app = express();

// --- Mongoose Connection Caching Setup ---
// 1. Define a global cache object to hold the persistent connection.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// 2. Define the serverless-safe connection function.
// This function will be called on every request, but will only connect if needed.
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error("MONGODB_URI is not defined.");
  }

  // Use cached connection if available
  if (cached.conn) {
    // console.log("⚡️ Using existing MongoDB connection.");
    return cached.conn;
  }

  // Create new connection promise if none exists
  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoURI).then((mongoose) => {
      return mongoose;
    });
  }

  // Await the promise and cache the result
  try {
    cached.conn = await cached.promise;
    // console.log(`✅ MongoDB Connected: ${cached.conn.connection.host}`);
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Clear promise to retry on next request
    throw error;
  }
};

// --- Middleware ---

// *** FIX: Updated CORS Origins ***
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://yogiraj-oil.vercel.app', // The main production domain (API target)
    'https://yogiraj-oil-git-main-niraj-chothanis-projects.vercel.app', // Existing preview domain
    'https://yogiraj-oil-nmly.vercel.app' // The specific preview domain currently failing (Client origin)
  ],
  credentials: true
}));
app.use(express.json());


// --- Database Connection Pre-Route Hook ---
// Middleware to ensure DB connection is ready before processing the API route
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next(); // Proceed to the API routes
    } catch (error) {
        // Log the internal database connection error
        console.error("Critical DB Connection Failure:", error.message); 
        // Send a 503 Service Unavailable immediately instead of waiting for 504 timeout
        res.status(503).json({ message: "Database service is temporarily unavailable." });
    }
});


// --- API Routes ---
// This is correct for Vercel deployment: all routes map under the root of the app.
app.use('/', allApiRoutes); 

// This file exports the app for index.js to use
export default app;