import mongoose from "mongoose";

const batterySchema = new mongoose.Schema({

  capacity: Number,

  chargingSpeed: Number,

  type: {
    type: String,
    default: "Li-Po"
  },

  batteryScore: {
    type: Number,
    default: 80
  },

  price: {
    type: Number,
    default: 0
  }

});

export default mongoose.model(
  "Battery",
  batterySchema
);