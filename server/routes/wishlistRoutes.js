import express from "express";

import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:packageId", protect, addToWishlist);

router.delete("/:packageId", protect, removeFromWishlist);

router.get("/", protect, getWishlist);

export default router;
