exports.home = (req, res) => {
  res.status(200).json({
    success: true,
    greetings: "Hello from backend API",
  });
};
exports.dummy = (req, res) => {
  res.status(200).json({
    success: true,
    message: "This is a dummy link",
  });
};
