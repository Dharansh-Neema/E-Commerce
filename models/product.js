const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    maxLength: [120, "Name can not be greater than 120 characters"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    maxLength: [5, "Price can not be greater than 5 digits"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  photos: [
    {
      id: {
        type: String,
        required: [true, "Image of the product is required"],
      },
      secure_url: {
        type: String,
        required: [true, "Image of the product is required"],
      },
    },
  ],
  brand: {
    type: String,
    required: [true, "Product Brand is required"],
  },
  category: {
    type: String,
    required: [true, "Please select from given category"],
    enum: {
      values: ["Short-sleeves", "long-sleeves", "Sweat shirt", "hoodies"],
      message: ["Please select any one from given values"],
    },
  },
  ratings: {
    type: Number,
    default: 0,
    maxValue: 5,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
      name: {
        type: String,
        required: [true, "Name of user is required"],
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
    },
  ],
  //user adding the product comes here
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "Person name who added the product is required"],
  },
  creadtedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
