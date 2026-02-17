const router = require("express").Router();
const Booking = require("../models/Booking");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// Create booking (Customer)
router.post("/", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json(booking);
  } catch(err) { res.status(400).json(err); }
});

// Get bookings for customer
router.get("/my", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("car");
    res.json(bookings);
  } catch(err) { res.status(400).json(err); }
});

// Admin: get all bookings
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user").populate("car");
    res.json(bookings);
  } catch(err) { res.status(400).json(err); }
});

module.exports = router;
