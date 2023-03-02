const BigPromise = require("../middleware/BigPromise");
const customError = require("../utils/customError");
const User = require("../models/user");
const bcrypt = require("bcrypt");
//importing cookie token
const cookieToken = require("../utils/cookieToken");
//importing cloudinary and fileUpload
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
//Signup route
exports.signup = BigPromise(async (req, res, next) => {
  if (!req.files) {
    return next(new customError("Image is required", 400));
  }
  if (!name || !email || !password) {
    return next(new customError("Name, Email and Password are required", 400));
  }
  const file = req.files.image;
  let result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "user",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    image: {
      id: result.public_id,
      secure_url: result.secure_url,
    },
  });

  //Creating Cookie Token
  cookieToken(user, res);
});
//login Route
exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new customError("Email and Password is Required", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new customError("Email or password is invalid", 404));
  }
  const compareResult = await bcrypt.compare(password, user.password);

  if (!compareResult) {
    return next(new customError("Email or password is invalid", 404));
  }
  cookieToken(user, res);
});
//Logout Route
exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});
