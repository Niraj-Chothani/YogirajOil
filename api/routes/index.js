// This file is at /api/routes/index.js
import express from "express";
import contactRouter from "./contact.routes.js";
import authRoutes from "./auth.js";
import productRoutes from "./productRoutes.js";
import galleryRoutes from "./galleryRoutes.js";

const router = express.Router();

// ⚠️ CORRECT: NO /api prefix here.
router.use("/contact", contactRouter);
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/gallery", galleryRoutes);

export default router;