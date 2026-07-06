import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getUsers, getProfile ,update_profile,updateUserRole,deleteUser} from "../controllers/userController.js"; // ✅ Correct controller
import upload from '../middleware/upload.js'

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.get("/get_profile", protect, getProfile);
router.put(
  "/update_profile",
  protect,
  upload.single("profilePic"),
  update_profile
);

router.put("/:id/role", protect, admin, updateUserRole);
router.delete("/:id", protect, admin, deleteUser);


export default router;