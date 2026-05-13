import express from "express";

import {
  saveMessage,
  getMessages,
  markMessageSeen,
} from "../controllers/chatController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, saveMessage);

router.get("/:userId", protect, getMessages);

router.put("/:id/seen", protect, markMessageSeen);

export default router;
