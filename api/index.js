import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import { app } from "./app.js"; // Import the configured app
import connectDB from "./config/db.js";

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from root directory
// This path goes one level UP from /server to find the .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Start the server
const PORT = process.env.PORT || 8081;
const startserver = async () => {
  try {
    // Import and connect to the database 
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📧 Email configured for: ${process.env.EMAIL_USER || 'Not configured'}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startserver();