const express = require("express");
const routers = express.Router();
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails,
  adminAlluser,
  managerRoutes,
  adminTogetOneUser,
  adminUpdateUser,
  adminDeleteUser,
} = require("../controllers/userControllers");
const isLoggedIn = require("../middleware/isLoggedIn");
const customRole = require("../middleware/customRole");
//Users routes
routers.route("/signup").post(signup);
routers.route("/login").post(login);
routers.route("/logout").get(logout);
routers.route("/forgotPassword").post(forgotPassword);
routers.route("/password/forgot/:token").get(resetPassword);
routers.route("/userDashboard").get(isLoggedIn, getLoggedInUserDetails);
routers
  .route("/userDashboard/password/update")
  .post(isLoggedIn, changePassword);
routers.route("/userDashboard/profile").get(isLoggedIn, updateUserDetails);

//Admin routes
routers
  .route("/admin/allUsers")
  .get(isLoggedIn, customRole("admin"), adminAlluser);
//Admin routes for user update, delete
routers
  .route("/admin/user/:id")
  .get(isLoggedIn, customRole("admin"), adminTogetOneUser)
  .put(isLoggedIn, customRole("admin"), adminUpdateUser)
  .delete(isLoggedIn, customRole("admin"), adminDeleteUser);
//Manager Routes
routers
  .route("/manager/routes")
  .get(isLoggedIn, customRole("manager"), managerRoutes);

module.exports = routers;
