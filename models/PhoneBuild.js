import mongoose from "mongoose";

const chassisSchema = new mongoose.Schema({
  material: String,
  durabilityScore: Number,
  premiumScore: Number,
  price: Number
});

export default mongoose.model("Chassis", chassisSchema);