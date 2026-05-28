import express from "express";
import { protect ,admin } from "../middleware/authMiddleware.js";
import { createBooking, getMyBookings,payBooking,cancelBooking,getAllBookings,getmybookingById} from "../controllers/bookingController.js";


const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getMyBookings); 
router.delete("/:id", protect, cancelBooking);
router.put("/:id/pay", protect, payBooking); // ✅ payment route
router.get("/:id", protect,getmybookingById );
// 🔐 ADMIN ONLY
router.get("/admin/all", protect, admin, getAllBookings);


export default router;
