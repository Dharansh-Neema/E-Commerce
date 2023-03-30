const express = require("express");
const routers = express.Router();
const { testProduct } = require("../controllers/productControllers");
routers.route("/test").get(testProduct);

module.exports = routers;
