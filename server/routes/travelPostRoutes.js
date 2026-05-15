import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createPost,
  getFeed,
  likePost,
  commentPost,
} from "../controllers/travelPostController.js";

const router = express.Router();

router.post("/", protect, createPost);

router.get("/", protect, getFeed);

router.put("/:id/like", protect, likePost);

router.post("/:id/comment", protect, commentPost);

export default router;
