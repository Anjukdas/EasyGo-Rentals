import express from "express";
import { sendTestEmail } from "../controllers/testEmailController.js";

const router = express.Router();

// GET /api/test-email
router.get("/", sendTestEmail);

export default router;