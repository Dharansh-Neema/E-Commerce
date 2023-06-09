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
  adminUpdateProducts,
  adminDeleteProduct,
} = require("../controllers/productControllers");

//User routes
routers.route("/products").get(getAllproducts);
// routers.route("/add/product").get(addprod2);
//admin routes
routers
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addProduct);

routers
  .route("/admin/products/all")
  .get(isLoggedIn, customRole("admin"), getAllproductsAdminRoute);

//REST API for admin
routers
  .route("/admin/product/:id")
  .get(isLoggedIn, customRole("admin"), getOneProduct)
  .put(isLoggedIn, customRole("admin"), adminUpdateProducts)
  .delete(isLoggedIn, customRole("admin"), adminDeleteProduct);

//Exporting our router
module.exports = routers;
