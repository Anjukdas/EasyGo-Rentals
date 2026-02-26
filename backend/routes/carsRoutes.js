import express from "express";
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getCars);
router.get("/:id", getCarById);

// Admin only
router.post("/", protect, admin, createCar);
router.put("/:id", protect, admin, updateCar);
router.delete("/:id", protect, admin, deleteCar);

export default router;