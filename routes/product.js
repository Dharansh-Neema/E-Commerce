const express = require("express");
const routers = express.Router();
const {
  testProduct,
  addProduct,
} = require("../controllers/productControllers");
routers.route("/test").get(testProduct);
routers.route("/addProduct").get(addProduct);
module.exports = routers;
