//Importing npm files
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const crypto = require("crypto");

//Creating user Schema
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

//Encrypting password before saving
userSchema.pre("save", async function (next) {
  //If the password is not being modified we don't encrypt it again
  if (!this.isModified("password")) return next();
  //Strenthing the password by 10 rounds of salt

  this.password = await bcrypt.hash(this.password, 10);
});

//Validating the password
userSchema.method.validPassword = async function (recivedpassword) {
  return await bcrypt.compare(recivedpassword, this.password);
};

//Siging jwt token
userSchema.method.getJWTtoken = function () {
  return jwtToken.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//Creating forgot password token
userSchema.method.forgotpasswordtoken = function () {
  //Generating random string
  const forgotPassword = crypto.randomBytes(20).toString("hex");
  //hashing before storing in DB
  //gettign a hash-make sure to get hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotPassword)
    .digest("hex");
  this.forgotPasswordExpiry = Date.now() + 60 * 60 * 1000;
  return forgotPassword;
};

//Exporting user schema
module.exports = mongoose.model("user", userSchema);
