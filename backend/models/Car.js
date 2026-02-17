import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // SUV, Sedan
    pricePerDay: { type: Number, required: true },
    seats: { type: Number },
    fuel: { type: String },
    available: { type: Boolean, default: true },
    image: {
  type: String,
  default: "https://via.placeholder.com/300x200?text=Car",
}

  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
