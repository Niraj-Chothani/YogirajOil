// server/app.js
import express from "express";
import cors from "cors";

// Import ONLY the main router
import apiRouter from "./routes/index.js";

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// Use express.json() for new Express versions (replaces bodyParser)
app.use(express.json());


// Main API Router - All API routes will be prefixed with /api
// This is the ONLY router you need.
app.use("/api", apiRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running!", timestamp: new Date().toISOString() });
});

export { app }; // Export the app for index.js to use