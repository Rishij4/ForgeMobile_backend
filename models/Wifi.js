import mongoose from "mongoose";

const wifiSchema = new mongoose.Schema({
  type: String,
  price: Number
});

export default mongoose.model(
  "Wifi",
  wifiSchema
);