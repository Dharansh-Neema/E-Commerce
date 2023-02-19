//Importing bigPromise middleware
const BigPromise = require("../middleware/BigPromise");

exports.home = BigPromise((req, res) => {
  res.status(200).json({
    success: true,
    greetings: "Hello from backend API",
  });
});
exports.dummy = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "This is a dummy link",
    });
  } catch (error) {
    console.log(error);
    res.send("An Error Occured");
  }
};
