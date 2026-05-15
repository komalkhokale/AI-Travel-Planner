import express from "express";

import protect from "../middleware/authMiddleware.js";

import { getPersonalizedRecommendations } from "../controllers/personalizedRecommendationController.js";

const router = express.Router();

router.get("/", protect, getPersonalizedRecommendations);

export default router;
