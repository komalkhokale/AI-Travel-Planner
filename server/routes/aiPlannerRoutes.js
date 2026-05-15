import express from "express";

import protect from "../middleware/authMiddleware.js";

import { generateSmartPlan } from "../controllers/aiPlannerController.js";

const router = express.Router();

router.post("/", protect, generateSmartPlan);

export default router;
