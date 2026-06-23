import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    // ADD THIS
    isVerified: {
      type: Boolean,
      default: false
    },


    resetToken: {
      type: String
    },

    resetTokenExpire: {
      type: Date
    }
  },

  { timestamps: true }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;