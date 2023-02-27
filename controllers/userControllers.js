const BigPromise = require("../middleware/BigPromise");
const customError = require("../utils/customError");
const User = require("../models/user");
//importing cookie token
const cookieToken = require("../utils/cookieToken");
//importing cloudinary and fileUpload
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
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
