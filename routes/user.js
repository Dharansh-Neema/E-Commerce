const express = require("express");
const routers = express.Router();
const { signup, login } = require("../controllers/userControllers");
routers.route("/signup").post(signup);
routers.route("/login").post(login);

module.exports = routers;
