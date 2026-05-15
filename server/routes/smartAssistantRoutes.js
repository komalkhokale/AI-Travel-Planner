import express from "express";

import protect from "../middleware/authMiddleware.js";

import { smartAssistant } from "../controllers/smartAssistantController.js";

const router = express.Router();

router.post("/", protect, smartAssistant);

export default router;
