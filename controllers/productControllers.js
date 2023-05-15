const customError = require("../utils/customError");
const BigPromise = require("../middleware/BigPromise");
//Importing cloudinary
const cloudinary = require("cloudinary");

//Importing product schema
const Product = require("../models/product");

const whereClause = require("../utils/whereClause");
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
  // req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.json({
    success: true,
    product,
  });
});
exports.getAllproducts = BigPromise(async (req, res, next) => {
  const resultPerpage = 6;
  const countTotalitem = await product.countDocuments();
  const products = new whereClause(product.find(), req.query).search().filter();
  const filtredProductCount = products.length;
  products.pager(resultPerpage);
  products = await products.base;
  res.status(200).json({
    products,
    countTotalitem,
    filtredProductCount,
  });
});
exports.testProduct = BigPromise(async (req, res, next) => {
  res.status(200).json({
    sucess: "true",
    message: "Test product Route",
  });
});
