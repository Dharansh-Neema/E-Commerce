const mongoose = require("mongoose");
// const validator = require("validator");
const OrderSchema = new mongoose.Schema({
  shippingInfo: {
    contact: {
      type: Number,
      required: true,
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
    ref: "user",
  },
  orderItem: [
    {
      name: String,
      quantity: Number,
      image: {
        type: String,
      },
      price: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
  paymentInfo: {
    id: String,
  },
  shippingAmount: Number,
  taxAmount: Number,
  totalAmount: Number,
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
