import mongoose from "mongoose";

const ramSchema = new mongoose.Schema({

  type: String,

  size: Number,

  performanceScore: {
    type: Number,
    default: 70
  },

  price: {
    type: Number,
    default: 0
  }

});

export default mongoose.model("RAM", ramSchema);