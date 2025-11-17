import express from "express";
import { handleContactForm } from "../controllers/contact.controller.js";

const router = express.Router();

// Handles POST requests to /api/contact
router.post("/", handleContactForm);

export default router;