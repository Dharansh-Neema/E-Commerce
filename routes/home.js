const express = require("express");
const routers = express.Router();

const { home, dummy } = require("../controllers/homeControllers");

routers.route("/").get(home);
routers.route("/dummy").get(dummy);
module.exports = routers;
