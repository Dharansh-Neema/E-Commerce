// const express = require("express");
const BigPromise = require("../middleware/BigPromise");
const customError = require("../utils/customError");
const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new customError("Name Email Password are required", 400));
  }
  const user = await User.create({ name, email, password });
  //   const token = user.getJWTtoken;
  cookieToken(user, res);
});
