const express = require("express");
const routers = express.Router();
const { signup, login, logout } = require("../controllers/userControllers");
routers.route("/signup").post(signup);
routers.route("/login").post(login);
routers.route("/logout").get(logout);
module.exports = routers;
