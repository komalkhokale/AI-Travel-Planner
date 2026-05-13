import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  sendGroupMessage,
  getGroupMessages,
} from "../controllers/groupChatController.js";

const router = express.Router();

router.post("/", protect, sendGroupMessage);

router.get("/:id", protect, getGroupMessages);

export default router;
