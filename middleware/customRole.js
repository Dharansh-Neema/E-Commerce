const customError = require("../utils/customError");
customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return new customError("Only Authorized person are allowed", 403);
    }
    next();
  };
};
module.exports = customRole;
