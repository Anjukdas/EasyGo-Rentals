import Car from "../models/Car.js";
import Booking from "../models/Booking.js";


// @desc    Create new car (Admin)
// @route   POST /api/cars
export const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
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