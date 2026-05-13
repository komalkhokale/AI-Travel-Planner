import express from "express";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createNotification,
  getNotifications,
  markNotificationRead,
  broadcastNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", protect, createNotification);

router.get("/", protect, getNotifications);

router.put("/:id/read", protect, markNotificationRead);

router.post("/broadcast", protect, admin, broadcastNotification);

export default router;
