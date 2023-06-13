const BigPromise = require("../middleware/BigPromise");
const Order = require("../models/order");
const Product = require("../models/product");
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

//Admin can update only delivery status and stock in product
exports.adminUpdateOrder = BigPromise(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return next(new customError("Order doesn't exist", 400));
  if (order.orderStatus === "delivered")
    return next(new customError("The order is already delivered"));
  order.orderStatus = req.body.orderStatus;
  order.orderItem.forEach((item) => {
    updateStock(item.product, item.quantity);
  });
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Order status changed",
    order,
  });
});
const updateStock = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (product.stock > quantity) {
      product.stock = product.stock - quantity;
    } else {
      throw new Error("This item is out of Stock");
    }
  } catch (error) {
    console.log(error);
  }
};

//Delete Order
exports.deleteOrder = BigPromise(async (req, res, next) => {
  const id = req.body.id;
  const order = Order.findById(id);
  if (!order) return next(new customError("Order not found", 404));
  await order.remove();
  res.status(200).json({
    success: true,
    message: "Order is been cancelled",
  });
});
