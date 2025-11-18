// This file is at /api/index.js
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import { app } from "./app.js"; // Import the configured app
import connectDB from "./config/db.js";

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in the root
// Vercel will use its own environment variables, this is for local dev
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// --- CONNECT TO DATABASE ---
// We do this once when the serverless function cold starts
connectDB();

// --- REMOVE THIS BLOCK ---
/*
const PORT = process.env.PORT || 8081;
const startserver = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};
startserver();
*/

// --- ADD THIS LINE ---
// Vercel uses this to run your app as a serverless function
export default app;