import mongoose from "mongoose";

const displaySchema = new mongoose.Schema({

  name: String,

  size: Number,

  refreshRate: Number,

  resolution: String,

  panelType: String,

  brightness: Number,

  displayScore: {
    type: Number,
    default: 80
  },

  batteryImpact: {
    type: Number,
    default: 0
  },

  price: {
    type: Number,
    default: 0
  }

});

export default mongoose.model(
  "Display",
  displaySchema
);