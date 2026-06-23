import mongoose from "mongoose";

const thermalSchema = new mongoose.Schema({
  name: String,
  coolingScore: Number,
  price: Number
});

export default mongoose.model("Thermal", thermalSchema);