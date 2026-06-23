import mongoose from "mongoose";

const hapticSchema = new mongoose.Schema({

  name: String,

  hapticsScore: {
    type: Number,
    default: 80
  },

  price: {
    type: Number,
    default: 0
  }

});

export default mongoose.model(
  "Haptic",
  hapticSchema
);