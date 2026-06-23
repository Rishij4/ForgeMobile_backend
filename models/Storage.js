import mongoose from "mongoose";

const storageSchema = new mongoose.Schema({

  type: {
    type: String,
    required: true
  },

  capacity: {
    type: Number,
    required: true
  },

  speedScore: {
    type: Number,
    default: 80
  },

  price: {
    type: Number,
    default: 0
  }

});

export default mongoose.model(
  "Storage",
  storageSchema
);