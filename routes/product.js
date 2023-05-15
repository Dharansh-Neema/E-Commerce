const express = require("express");
const customRole = require("../middleware/customRole");
const isLoggedIn = require("../middleware/isLoggedIn");

const routers = express.Router();
const {
  addProduct,
  getAllproducts,
  addprod2,
} = require("../controllers/productControllers");

//User routes
routers.route("/products").get(getAllproducts);
// routers.route("/add/product").get(addprod2);
//admin routes
routers.route("/admin/product/add").post(addProduct);
module.exports = routers;
