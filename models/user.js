const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required "],
    maxLenght: [40, "Name can't be greater than 40 character"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please enter valid Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    minLength: [6, "Password should be of minimum length 6 "],
  },
  image: {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("user", userSchema);
