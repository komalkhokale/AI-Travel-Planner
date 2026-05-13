import express from "express";

import { generateItinerary } from "../controllers/aiController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/itinerary", protect, generateItinerary);

export default router;
