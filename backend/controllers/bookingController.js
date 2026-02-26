import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// export const createBooking = async (req, res) => {
//   try {
//     const { carId, pickupDate, dropDate } = req.body;

//     const car = await Car.findById(carId);
//     console.log("CAR FROM DB 👉", car);
//     console.log("AVAILABLE FIELD 👉", car?.available);
//     if (!car || !car.available) {
//       console.log("FAILED AVAILABILITY CHECK");
//       return res.status(400).json({ message: "Car not available" });
//     }
//     //  Date Overlap Check
//     const overlappingBooking = await Booking.findOne({
//       car: carId,
//       $or: [
//         { pickupDate: { $lte: new Date(dropDate) }, dropDate: { $gte: new Date(pickupDate) } }
//       ]
//     });

//     if (overlappingBooking) {
//       return res.status(400).json({ message: "Car already booked for selected dates" });
//     }

//     const days =
//       (new Date(dropDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);

//     const totalPrice = days * car.pricePerDay;

//     const booking = await Booking.create({
//       user: req.user._id,
//       car: carId,
//       pickupDate,
//       dropDate,
//       totalPrice,
//     });

//     car.available = false;
//     await car.save();

//     res.status(201).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const createBooking = async (req, res) => {
  try {
    const { carId, pickupDate, dropDate } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // ✅ Date Overlap Check (main availability logic)
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
    const booking = await Booking.create({
      user: req.user._id,
      car: carId,
      pickupDate,
      dropDate,
      totalPrice,
      paymentStatus: "Pending",
    });

    // Optional: mark car unavailable while booking exists (for dashboards)
    car.available = false; 
    await car.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

// export const cancelBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // 👤 Ownership check
//     if (booking.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Not authorized to cancel this booking" });
//     }

//     // 🚗 Make car available again
//     const car = await Car.findById(booking.car);
//     if (car) {
//       car.available = true;
//       await car.save();
//     }

//     await booking.deleteOne();

//     res.status(200).json({ message: "Booking cancelled successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 👤 Ownership check
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    const car = await Car.findById(booking.car);

    // Delete booking
    await booking.deleteOne();

    // ✅ Check for other future bookings of same car
    const futureBooking = await Booking.findOne({
      car: car._id,
      dropDate: { $gte: new Date() }, // any booking in the future
    });

    if (!futureBooking) {
      car.available = true; // only mark available if no future bookings
      await car.save();
    }

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const payBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only the booking owner can pay
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to pay this booking" });
    }

    // Update payment
    booking.paymentStatus = "Paid";
    booking.transactionId = req.body.transactionId || "MOCK_TXN_" + Date.now();

    await booking.save();

    res.status(200).json({ message: "Payment successful", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};