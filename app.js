const express = require("express");
const connectWithDB = require("./config/db");
const cloudinary = require("cloudinary");
require("dotenv").config();
//Configration of cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
//Connecting with DataBase
connectWithDB();
const app = express();
module.exports = app;
