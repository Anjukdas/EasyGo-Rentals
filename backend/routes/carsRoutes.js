import express from "express";
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  getAvailableCars
} from "../controllers/carController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";


const router = express.Router();

// Public
router.get("/", getCars);
// GET /api/cars/available?pickupDate=2026-06-10&dropDate=2026-06-15
router.get("/available", getAvailableCars);
router.get("/:id", getCarById);


// Admin only
router.post("/", protect, admin, createCar);
router.put("/:id", protect, admin, updateCar);
router.delete("/:id", protect, admin, deleteCar);
router.post("/", upload.single("image"), createCar);
router.put("/:id", upload.single("image"), updateCar);

export default router;