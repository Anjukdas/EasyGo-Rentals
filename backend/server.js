
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carsRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js"


connectDB();

const app = express();


app.use(cors());
app.use(express.json());

app.use('/uploads',express.static(path.join(path.resolve(),'uploads')));



app.get("/", (req, res) => {
  res.send("Car Rental Backend Running 🚗");
});

app.use("/api/admin",adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

// app.use("/uploads", express.static("uploads"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

