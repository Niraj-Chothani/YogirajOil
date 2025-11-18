// This file is at /api/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/index.js";

// Load env variables to get FRONTEND_URL
dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:5173', // For local development
    process.env.FRONTEND_URL // Your live Vercel URL
  ],
  credentials: true
}));

app.use(express.json());

// Main API Router - All API routes will be prefixed with /api
// This is correct. It strips /api and sends the rest to the router.
app.use("/api", apiRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running!", timestamp: new Date().toISOString() });
});

export { app }; // Export the app for index.js to use