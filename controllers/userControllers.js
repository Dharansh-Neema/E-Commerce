const BigPromise = require("../middleware/BigPromise");
const customError = require("../utils/customError");
const User = require("../models/user");
const bcrypt = require("bcrypt");
//importing cookie token
const cookieToken = require("../utils/cookieToken");
//importing cloudinary and fileUpload
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
//importing mail sender util function
const mailsender = require("../utils/mailhelper");
//importing user model of DB
const user = require("../models/user");
//importing crypto to encrypt the password
const crypto = require("crypto");
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
//Temporary function
const forgotPassword = () => {
  const forgotPassword = crypto.randomBytes(20).toString("hex");
  const forgotToken = crypto
    .createHash("sha256")
    .update(forgotPassword)
    .digest("hex");
  return forgotToken;
};
//Forgot and Reset Password Routes
exports.forgotPassword = BigPromise(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new customError("User not found!", 400));

  // const forgotToken = user.forgotpasswordtoken();

  const forgotToken = forgotPassword();
  user.forgotPasswordToken = forgotToken;
  user.forgotPasswordExpiry = Date.now() + 60 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  const MyUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/forgot/${forgotToken}`;
  const message = `To reset your password copy and paste the given url in your browser \n\n ${MyUrl} `;
  try {
    mailsender({ email, subject: "Ecom Password Reset", message });
    cookieToken(user, res);
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    user.save({ validateBeforeSave: false });
    return next(new customError(error, 500));
  }
});
exports.resetPassword = BigPromise(async (req, res, next) => {
  const token = req.params.token;
  const encryptToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    forgotPasswordToken: token,
  });
  console.log(user);
  if (!user)
    return next(new customError("Token is either invalid or expired"), 400);
  if (req.body.password !== req.body.confirmPassword)
    return next(
      new customError("Both password and confirm password should be same", 400)
    );
  user.password = req.body.password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();
  cookieToken(user, res);
});

//User dashBoard
exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);
  if (!user) return next(new customError("Logged In first", 401));
  res.status(200).json({
    success: true,
    user,
  });
});
