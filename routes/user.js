const express = require("express");
const routers = express.Router();
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getLoggedInUserDetails,
} = require("../controllers/userControllers");
const isLoggedIn = require("../middleware/isLoggedIn");
routers.route("/signup").post(signup);
routers.route("/login").post(login);
routers.route("/logout").get(logout);
routers.route("/forgotPassword").post(forgotPassword);
routers.route("/password/forgot/:token").get(resetPassword);
routers.route("/userDashboard").get(isLoggedIn, getLoggedInUserDetails);
module.exports = routers;
