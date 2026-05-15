import express from "express";

import protect from "../middleware/authMiddleware.js";

import { createStory, getStories } from "../controllers/storyController.js";

const router = express.Router();

router.post("/", protect, createStory);

router.get("/", protect, getStories);

export default router;
