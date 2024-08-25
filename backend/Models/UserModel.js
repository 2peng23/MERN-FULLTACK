const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_role: {
      type: Number,
      required: true,
      default: 0, // Default value of 0
    },
    access_token: {
      type: String,
      default: null, // Make it nullable by defaulting to null
    },
    refresh_token: {
      type: String,
      default: null, // Make it nullable by defaulting to null
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
