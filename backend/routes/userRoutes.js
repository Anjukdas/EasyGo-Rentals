import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getUsers ,getProfile} from "../controllers/userController.js"; // ✅ Correct controller

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.get("/get_profile",protect,getProfile)
// router.put(/update_profile)



export default router;