import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema({
  cameraType: {
    type: String,
    required: true
  },

  mp: {
    type: mongoose.Schema.Types.Mixed,   // Number OR "ToF"
    required: true
  },

  ois: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  }
});

export default mongoose.model("Camera", cameraSchema);