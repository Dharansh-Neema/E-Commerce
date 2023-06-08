const express = require("express");
const customRole = require("../middleware/customRole");
const isLoggedIn = require("../middleware/isLoggedIn");

const routers = express.Router();
const {
  addProduct,
  getAllproducts,
  addprod2,
  getOneProduct,
  getAllproductsAdminRoute,
} = require("../controllers/productControllers");

//User routes
routers.route("/products").get(getAllproducts);
routers.route("/product/:id").get(getOneProduct);
// routers.route("/add/product").get(addprod2);
//admin routes
routers
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addProduct);

routers
  .route("/admin/all/products")
  .get(isLoggedIn, customRole("admin"), getAllproductsAdminRoute);
module.exports = routers;
