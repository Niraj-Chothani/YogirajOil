import express from "express";
import contactRouter from "./contact.routes.js";
import authRoutes from "./auth.js";
// --- 1. Import the new routes ---
import productRoutes from "./productRoutes.js"; // Make sure filename matches
import galleryRoutes from "./galleryRoutes.js"; // Make sure filename matches

const router = express.Router();

// Mount the contact routes at /api/contact
router.use("/contact", contactRouter);
router.use("/auth", authRoutes);

// --- 2. Mount the new routes ---
router.use("/products", productRoutes);
router.use("/gallery", galleryRoutes);

// You can add more routes here later, e.g.:
// router.use("/users", userRouter);

export default router;