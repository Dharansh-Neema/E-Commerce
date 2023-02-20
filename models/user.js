//Importing npm files
const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcrypt");

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

//Encrypting password before saving
userSchema.pre("save", async function (next) {
  //If the password is not being modified we don't encrypt it again
  if (!this.isModified("password")) return next();
  //Strenthing the password by 10 rounds of salt
  this.password = await bycrypt(this.password, 10);
});

//Validating the password
userSchema.method.isValidatedPassword = async function (recivedpassword) {
  return await bycrypt.compare(recivedpassword, this.password);
};

//Exporting user schema
module.exports = mongoose.model("user", userSchema);
