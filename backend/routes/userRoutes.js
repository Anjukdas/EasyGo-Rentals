import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getUsers } from "../controllers/userController.js"; // ✅ Correct controller

const router = express.Router();

router.get("/", protect, admin, getUsers);

export default router;