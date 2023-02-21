const express = require("express");
const connectWithDB = require("./config/db");
require("dotenv").config();
//Connecting with DataBase
connectWithDB();
const app = express();
module.exports = app;
