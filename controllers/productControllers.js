// const customError = require("../utils/customError");
const BigPromise = require("../middleware/BigPromise");

exports.testProduct = BigPromise(async (req, res, next) => {
  res.status(200).json({
    sucess: "true",
    message: "Test product Route",
  });
});
