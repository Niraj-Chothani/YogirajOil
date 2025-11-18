// This file is at 'api/routes/index.js'
import express from "express";
import contactRouter from "./contact.routes.js";
import authRoutes from "./auth.js";
import productRoutes from "./productRoutes.js";
import galleryRoutes from "./galleryRoutes.js";
// Import any other routers here

const router = express.Router();

// ⚠️ FIX: All routes must start with '/api'
router.use("/api/contact", contactRouter);
router.use("/api/auth", authRoutes);
router.use("/api/products", productRoutes);
router.use("/api/gallery", galleryRoutes);
// Add any other routes here, e.g., router.use("/api/users", ...)

export default router;