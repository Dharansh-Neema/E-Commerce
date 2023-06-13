const express = require("express");
const routers = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const customRole = require("../middleware/customRole");
const {
  createOrder,
  getOneOrder,
  getLoggedinOrder,
  adminGetAllOrder,
  adminUpdateOrder,
  deleteOrder,
} = require("../controllers/orderControllers");
//User routes
routers.route("/order/create").post(isLoggedIn, createOrder);

routers.route("/order/myorder").get(isLoggedIn, getLoggedinOrder);

routers.route("/order/:id").get(isLoggedIn, getOneOrder); //This type of routes should always be placed at last bcuz no matter what but after /order/ it will except some id and i.e. if u route /order/getorder it won't work if it's below that

//Admin routes
routers
  .route("/order/allorders")
  .post(isLoggedIn, customRole("admin"), adminGetAllOrder);

routers
  .route("/order/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOrder)
  .delete(isLoggedIn, customRole("admin"), deleteOrder);
module.exports = routers;
