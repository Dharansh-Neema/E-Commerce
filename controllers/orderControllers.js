const BigPromise = require("../middleware/BigPromise");
const Order = require("../models/order");
const customError = require("../utils/customError");
//User routes for order
exports.createOrder = BigPromise(async (req, res, next) => {
  const {
    shippingInfo,
    shippingAmount,
    orderItem,
    paymentInfo,
    taxAmount,
    totalAmount,
    orderStatus,
  } = req.body;
  if (!shippingInfo) throw new Error("Shippin Info is required");
  const order = await Order.create({
    shippingInfo,
    shippingAmount,
    orderItem,
    paymentInfo,
    taxAmount,
    totalAmount,
    orderStatus,
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getOneOrder = BigPromise(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id).populate("user", "name email"); //Populate function is to give in-depth info of particular model
  if (!order) return next(new customError("Not able to find this order", 404));
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getLoggedinOrder = BigPromise(async (req, res, next) => {
  const id = req.user._id; //Thuis time it's user id;
  const order = await Order.find({ user: id });
  if (!order) return next(new customError("Not able to find this order", 404));
  res.status(200).json({
    success: true,
    order,
  });
});

//Admin routes

exports.adminGetAllOrder = BigPromise(async (req, res, next) => {
  const order = await Order.find();
  res.status(200).json({
    success: true,
    order,
  });
});
