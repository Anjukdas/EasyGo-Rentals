import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { carId, pickupDate, dropDate } = req.body;

    // Check car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Check overlapping bookings
    const overlappingBooking = await Booking.findOne({
      car: carId,
      $or: [
        {
          pickupDate: { $lte: new Date(dropDate) },
          dropDate: { $gte: new Date(pickupDate) },
        },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        message: "Car already booked for selected dates",
      });
    }

    // Calculate total price
    const days =
      (new Date(dropDate).getTime() - new Date(pickupDate).getTime()) /
      (1000 * 60 * 60 * 24);

    const totalPrice = days * car.pricePerDay;

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      car: carId,
      pickupDate,
      dropDate,
      totalPrice,
      paymentStatus: "Pending",
    });

    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET MY BOOKINGS
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("car", "name brand pricePerDay image")
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADMIN: GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("car", "name category pricePerDay")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// PAY BOOKING
export const payBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "Paid";
    booking.transactionId = "TXN" + Date.now();

    await booking.save();

    res.json({
      message: "Payment successful",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id)
    .populate("car");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    // Only the user who created booking can cancel
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    await booking.deleteOne();

    res.json({
      message: "Booking cancelled successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getmybookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("car");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
