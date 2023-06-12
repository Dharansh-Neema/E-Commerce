const mongoose = require("mongoose");
const validator = require("validator");
const OrderSchema = new mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      validate: validator.isEmail,
    },
    address: {
      type: String,
      required: [true, "Address of Shipment is required"],
    },
    city: String,
    PostalCode: Number,
    state: String,
    country: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  orderItem: [
    {
      name: String,
      quantity: Number,
      image: {
        id: String,
        secure_url: String,
      },
      price: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
  paymentInfo: {
    type: String,
  },
  ShippingAmount: Number,
  taxAmount: Number,
  TotalAmount: Number,
  orderStatus: {
    type: String,
    default: "processing",
  },
  deliverdAt: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("order", OrderSchema);
