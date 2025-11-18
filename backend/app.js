// This file is at 'api/app.js'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import allApiRoutes from './routes/index.js'; // This path is correct

const app = express();

// --- Middleware ---
app.use(cors({
  origin: [
    'http://localhost:5173', // For local development
    'https://yogiraj-oil-git-main-niraj-chothanis-projects.vercel.app' // Your live site
  ],
  credentials: true
}));
app.use(express.json());

// --- Database Connection ---
// (Your mongoose.connect(...) logic goes here)
// Make sure MongoDB Atlas IP Whitelist is 0.0.0.0/0

// --- API Routes ---
// ⚠️ FIX: This must be '/'
// This passes the full path (e.g., /api/auth/login) to your router.
app.use('/', allApiRoutes); 

// This file exports the app for index.js to use
export default app;