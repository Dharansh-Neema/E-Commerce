const customError = require("../utils/customError");
const BigPromise = require("../middleware/BigPromise");
//Importing cloudinary
const cloudinary = require("cloudinary");

//Importing product schema
const Product = require("../models/product");

const whereClause = require("../utils/whereClause");
const product = require("../models/product");
//Creating routes for product
exports.addProduct = BigPromise(async (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  let imageArray = [];
  // if (!req.body.image) {
  //   throw new Error("Product images are required");
  // }
  if (!req.files) {
    throw new Error("Product images are required");
    // return new customError("Product images are required", 401);
  }
  if (req.files) {
    for (let index = 0; index < req.files.image.length; index++) {
      const toUpload = req.files.image[index].tempFilePath;
      const result = await cloudinary.v2.uploader.upload(toUpload, {
        folder: "products",
      });
      imageArray.push({ id: result.public_id, secure_url: result.secure_url });
    }
  }
  req.body.image = imageArray;
  console.log(req.body);
  // const {name,price,description,brand,}
  // req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.json({
    success: true,
    product,
  });
});
exports.getAllproducts = BigPromise(async (req, res, next) => {
  const resultPerpage = 6;
  // const countTotalitem = await Product.countDocuments();
  const productsObj = new whereClause(Product.find(), req.query)
    .search()
    .filter();
  let products = await productsObj.base;
  const filtredProductCount = products.length;
  productsObj.Pager(resultPerpage);
  products = await productsObj.base.clone();
  res.status(200).json({
    products,
    filtredProductCount,
  });
});
exports.testProduct = BigPromise(async (req, res, next) => {
  res.status(200).json({
    sucess: "true",
    message: "Test product Route",
  });
});
exports.getAllproductsAdminRoute = BigPromise(async (req, res, next) => {
  const products = await Product.find();
  if (!products) return new customError("Product not found", 401);
  res.status(200).json({
    success: true,
    products,
  });
});

exports.getOneProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return new customError("Product not found", 401);
  res.status(200).json({
    success: true,
    product,
  });
});

exports.adminUpdateProducts = BigPromise(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  const imageArray = [];
  if (req.files) {
    for (let index = 0; index < product.image.length; index++) {
      const res = cloudinary.v2.uploader.destroy(product.image[index].id);
    }
    for (let index = 0; index < req.files.image.length; index++) {
      const toUpload = req.files.image[index].tempFilePath;
      const result = await cloudinary.v2.uploader.upload(toUpload, {
        folder: "products",
      });
      imageArray.push({ id: result.public_id, secure_url: result.secure_url });
    }
    console.log("Old images has been deleted and new images has beend added");
  }
  req.body.image = imageArray;
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json({
    success: true,
    message: "Updation successfully",
    product,
  });
});

exports.adminDeleteProduct = BigPromise(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    new customError("The product doesn't exist", 404);
  }
  if (req.files) {
    for (let index = 0; index < product.image.length; index++) {
      const id = product.image[index].id;
      await cloudinary.v2.uploader.destroy(id, { folder: "products" });
    }
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product has been removed successfully",
  });
});

//Review Routes handeled here

exports.addReview = BigPromise(async (req, res, next) => {
  let product = await Product.findById(req.params._id);
  if (!product) {
    return new customError("Product don't exist anymore", 401);
  }
  const review = {
    user: req.body.user._id,
    name: req.body.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };
  const alreadyReviewd = product.reviews.find(
    (rev) => rev.user.toString() === req.body.user._id.toString()
  );
  if (alreadyReviewd) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.body.user._id.toString()) {
        (review.comment = req.body.comment),
          (review.rating = Number(req.body.rating)),
          (review.name = req.body.name);
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Review Added successfully",
  });
});

exports.allReviewForOneProduct = BigPromise(async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return new customError("Product don't exist", 404);
  }
  const reviews = product.reviews;
  res.status(200).json({
    success: true,
    reviews,
  });
});

exports.deleteReview = BigPromise(async (req, res, next) => {
  const { ProductId } = req.body;
  let product = await Product.findById(ProductId);
  const id = req.body.user._id;
  const res = product.reviews.filter(
    (rev) => rev.user.toString() !== id.toString()
  );
  const NoOfRatings = res.length;
  const rating = res.reduce((acc, item) => item.rating + acc, 0) / NoOfRatings;
  await Product.findByIdAndUpdate(ProductId, {
    reviews: res,
    numberOfReviews: NoOfRatings,
    ratings: rating,
  });
  product = await product.save({ new: true });
  res.status(200).json({
    success: true,
    message: "Review Deleted",
    product,
  });
});
