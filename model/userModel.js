const mongoose = require("mongoose");

const userSchems = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchems);
module.exports = UserModel;
