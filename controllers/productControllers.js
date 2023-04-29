const customError = require("../utils/customError");
const BigPromise = require("../middleware/BigPromise");
//Importing cloudinary
const cloudinary = require("cloudinary");

//Importing product schema
const product = require("../models/product");

//Creating routes for product
exports.addProduct = BigPromise(async (req, res, next) => {
  let imageArray = [];
  if (!req.files) {
    return new customError("Product images are required", 401);
  }
  if (req.files) {
    for (let index = 0; index < req.body.image.length; index++) {
      const toUpload = req.files.image[index].tempFilePath;
      const result = await cloudinary.v2.uploader.upload(toUpload, {
        folder: "products",
      });
      imageArray.push({ id: result.public_id, securl_url: result.secure_url });
    }
  }
  req.body.image = imageArray;
  req.body.user = req.user.id;

  const product = await product.create(req.body);
  res.json({
    success: true,
    product,
  });
});

exports.testProduct = BigPromise(async (req, res, next) => {
  res.status(200).json({
    sucess: "true",
    message: "Test product Route",
  });
});
