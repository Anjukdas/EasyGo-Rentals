import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import { upload } from "../middleware/upload.js";



// @desc    Create new car (Admin)
// @route   POST /api/cars
// export const createCar = async (req, res) => {
//   try {
//     const car = await Car.create(req.body);
//     res.status(201).json(car);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



export const createCar = async (req, res) => {
  try {
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const car = new Car({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      pricePerDay: req.body.pricePerDay,
      image: imageUrl,
    });

    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all cars (Public)
export const getCars = async (req, res) => {
  try {
    const { pickupDate, dropDate } = req.query;

    let cars = await Car.find();

    if (pickupDate && dropDate) {

      // Find bookings overlapping selected dates
      const bookings = await Booking.find({
        $or: [
          {
            pickupDate: { $lte: new Date(dropDate) },
            dropDate: { $gte: new Date(pickupDate) }
          }
        ]
      });

      const bookedCarIds = bookings.map(b => b.car.toString());

      // Filter available cars
      cars = cars.filter(car => !bookedCarIds.includes(car._id.toString()));
    }

    res.json(cars);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get single car (Public)
// @route   GET /api/cars/:id
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update car (Admin)
// @route   PUT /api/cars/:id
// export const updateCar = async (req, res) => {
//   try {
//     const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!car) return res.status(404).json({ message: "Car not found" });
//     res.json(car);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : undefined;

    const updatedData = {
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      fuel: req.body.fuel || "Petrol",
      seats: req.body.seats || 5,
      pricePerDay: req.body.pricePerDay,
    };

    if (imageUrl) {
      updatedData.image = imageUrl;
    }

    const car = await Car.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete car (Admin)
// @route   DELETE /api/cars/:id
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAvailableCars = async (req, res) => {
  try {
    const { pickupDate, dropDate } = req.query; // Query params vazhi dates edukkunnu

    if (!pickupDate || !dropDate) {
      return res.status(400).json({ 
        message: "Please provide both pickupDate and dropDate" 
      });
    }

    const start = new Date(pickupDate);
    const end = new Date(dropDate);

    if (start >= end) {
      return res.status(400).json({ 
        message: "Drop date must be after pickup date" 
      });
    }

    // STEP 1: Ee dates-il already book aayittulla cars-nte ID kandupidikkuka
    const bookedBookings = await Booking.find({
      paymentStatus: { $ne: "Cancelled" }, // Cancelled aaya bookings ozhivakkaam
      $or: [
        {
          pickupDate: { $lte: end },
          dropDate: { $gte: start },
        },
      ],
    }).select("car"); // Car ID maathram edukkunnu

    // Booked aaya car ID-kalude mathram oru array aakkunnu
    const bookedCarIds = bookedBookings.map((b) => b.car);

    // STEP 2: Ee ID-kalil illatha (Not In -> $nin) baaki ulla ella cars-um fetch cheyyunnu
    const availableCars = await Car.find({
      _id: { $nin: bookedCarIds },
    });

    res.status(200).json({
      count: availableCars.length,
      cars: availableCars,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};