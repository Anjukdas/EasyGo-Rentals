import dotenv from "dotenv";
dotenv.config();
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE BOOKING WITH STRIPE CHECKOUT
export const createBooking = async (req, res) => {
  try {
    const { carId, pickupDate, dropDate } = req.body;
    if (!carId || !pickupDate || !dropDate) {
      return res.status(400).json({
        message: "Car ID, pickup date and drop date are required"
      });
    }

    // 1. Check car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // 2. Check overlapping bookings
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

    // 3. Calculate total price
    const days =
      (new Date(dropDate).getTime() - new Date(pickupDate).getTime()) /
      (1000 * 60 * 60 * 24);

    const totalPrice = days * car.pricePerDay;

    // 4. Create booking in Database (Status: Pending)
    const booking = new Booking({
      user: req.user._id,
      car: carId,
      pickupDate,
      dropDate,
      totalPrice,
      paymentStatus: "Pending",
    });

    await booking.save();

    // 5. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'aed', 
            product_data: {
              name: `${car.brand} ${car.name}`, 
              description: `Booking from ${pickupDate} to ${dropDate}`,
            },
            unit_amount: totalPrice * 100, 
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5174/success?bookingId=${booking._id}`,
      cancel_url: `http://localhost:5174/cancel`,
    });

    res.status(201).json({
      message: "Booking initiated. Complete payment to confirm.",
      booking,
      stripeSessionId: session.id,
      stripeUrl: session.url 
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