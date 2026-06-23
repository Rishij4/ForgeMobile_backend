import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  name: String,

  sensorScore: {
    type: Number,
    default: 0
  },

  price: {
    type: Number,
    default: 0
  }
});

export default mongoose.model(
  "Sensor",
  sensorSchema
);