const BigPromise = require("../middleware/BigPromise");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const IsLoggedIn = BigPromise(async (req, res, next) => {
  const token =
    req.cookie.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return next(new customError("Please Login first", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await user.findById(decoded.id);
});

module.exports = IsLoggedIn;
