const BigPromise = require("../middleware/BigPromise");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
IsLoggedIn = BigPromise(async (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return next(new customError("Please Login first", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decoded);
  req.user = await User.findById(decoded.id);
  next();
});

module.exports = IsLoggedIn;
