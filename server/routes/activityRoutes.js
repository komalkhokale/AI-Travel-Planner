import express from "express";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createActivity,
  getActivities,
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/", protect, createActivity);

router.get("/", protect, admin, getActivities);

export default router;
