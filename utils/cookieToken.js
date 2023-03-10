const jwtToken = require("jsonwebtoken");
const cookieToken = function (user, res) {
  const token = jwtToken.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  console.log("JWT TOKEN:", token);
  const options = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
module.exports = cookieToken;
