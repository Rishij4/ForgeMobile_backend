import mongoose from "mongoose";

const networkSchema = new mongoose.Schema({
  type: String,
  price: Number
});

export default mongoose.model(
  "Network",
  networkSchema
);