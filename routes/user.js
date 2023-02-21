const express = require("express");
const routers = express.Router();
const { signup } = require("../controllers/userControllers");
routers.route("/signup").post(signup);

module.exports = routers;
