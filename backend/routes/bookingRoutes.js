import express from "express";
import { protect ,admin } from "../middleware/authMiddleware.js";
import {
createBooking,
getMyBookings,
payBooking,
payBookingSession,
cancelBooking,
getAllBookings,
getmybookingById
} from "../controllers/bookingController.js";

const router = express.Router();

// router.post("/", protect, createBooking);
// router.get("/my-booking", protect, getMyBookings); 
// router.delete("/:id", protect, cancelBooking);
// router.put("/:id/pay", protect, payBooking); // ✅ payment route
// router.post("/:id/pay", protect, payBookingSession);
// router.get("/:id", protect,getmybookingById );
// // 🔐 ADMIN ONLY
// router.get("/admin/all", protect, admin, getAllBookings);
router.post("/", protect, createBooking);

router.get("/", protect, getMyBookings);

router.post("/:id/pay-session", protect, payBookingSession);

router.put("/:id/pay", protect, payBooking);

router.delete("/:id", protect, cancelBooking);

router.get("/:id", protect, getmybookingById);

router.get("/admin/all", protect, admin, getAllBookings);


export default router;
