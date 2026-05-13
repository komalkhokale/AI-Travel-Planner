import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createGroupTrip,
  addExpense,
  calculateSplit,
} from "../controllers/groupTripController.js";

const router = express.Router();

router.post("/", protect, createGroupTrip);

router.post("/:id/expense", protect, addExpense);

router.get("/:id/split", protect, calculateSplit);

export default router;
