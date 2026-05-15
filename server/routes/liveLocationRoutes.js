import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  updateLocation,
  getTripLocations,
} from "../controllers/liveLocationController.js";

const router = express.Router();

router.post("/update", protect, updateLocation);

router.get("/:id", protect, getTripLocations);

export default router;
