import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalCars =
      await Car.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    const totalUsers =
      await User.countDocuments();

    const paidBookings =
      await Booking.find({
        paymentStatus: "Paid",
      });

    const revenue =
      paidBookings.reduce(
        (sum, booking) =>
          sum + booking.totalPrice,
        0
      );

    res.json({
      totalCars,
      totalBookings,
      totalUsers,
      revenue,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};