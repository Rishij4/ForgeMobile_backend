import mongoose from "mongoose";

const connectivitySchema =
new mongoose.Schema({

  network: String,

  wifi: String,

  bluetooth: String,

  nfc: Boolean,

  connectivityScore: {
    type: Number,
    default: 80
  },

  price: {
    type: Number,
    default: 0
  }

});

export default mongoose.model(
  "Connectivity",
  connectivitySchema
);