const express = require("express");
const routers = express.Router();
const {
  signup,
  login,
  logout,
  forgotPassword,
} = require("../controllers/userControllers");
routers.route("/signup").post(signup);
routers.route("/login").post(login);
routers.route("/logout").get(logout);
routers.route("/forgotPassword").post(forgotPassword);
module.exports = routers;
