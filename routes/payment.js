const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const {
  stripePaymentkeys,
  paymentGatewayStripe,
} = require("../controllers/paymentControllers");
const routers = express.Router();

routers.route("/payment/keys").get(isLoggedIn, stripePaymentkeys);
routers.route("/payment").post(isLoggedIn, paymentGatewayStripe);

module.exports = routers;
