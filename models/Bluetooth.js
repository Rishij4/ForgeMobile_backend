import mongoose from "mongoose";

const bluetoothSchema = new mongoose.Schema({
  type: String,
  price: Number
});

export default mongoose.model(
  "Bluetooth",
  bluetoothSchema
);