import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  saveItinerary,
  getUserItineraries,
  deleteItinerary,
} from "../controllers/itineraryController.js";

const router = express.Router();

router.post("/", protect, saveItinerary);

router.get("/", protect, getUserItineraries);

router.delete("/:id", protect, deleteItinerary);

export default router;
