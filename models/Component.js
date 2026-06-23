import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
  name: String,

  price: {
    type: Number,
    default: 0
  }
});

export default mongoose.model(
  "Component",
  componentSchema
);