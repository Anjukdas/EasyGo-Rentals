import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
// import {
// createBooking,
// getMyBookings,
// payBooking,
// payBookingSession,
// cancelBooking,
// getAllBookings,
// getmybookingById
// } from "../controllers/bookingController.js";
import {
    createBooking,
    getMyBookings,
    payBooking,
    payBookingSession,
    cancelBooking,
    getAllBookings,
    getmybookingById,
    updateBookingStatus,
    deleteBookingAdmin
} from "../controllers/bookingController.js";

const router = express.Router();


router.post("/", protect, createBooking);

router.get("/", protect, getMyBookings);

router.post("/:id/pay-session", protect, payBookingSession);

router.put("/:id/pay", protect, payBooking);

router.delete("/:id", protect, cancelBooking);

router.get("/:id", protect, getmybookingById);

router.get("/admin/all", protect, admin, getAllBookings);

// ADMIN UPDATE STATUS
router.put("/admin/:id/status",protect,admin,updateBookingStatus);


// ADMIN DELETE BOOKING
router.delete("/admin/:id",protect,admin,deleteBookingAdmin);


export default router;
