const express = require("express");
//Importing app from app.js
const app = require("./app");
//config .env file
require("dotenv").config();

//importing and using file and cookie middleware
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
app.use(fileUpload());
app.use(cookieParser());

//Regulare middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//some basic logger middleware
const morgan = require("morgan");
app.use(morgan("tiny"));

//importing and using Yaml documentation and swagger-ui

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//importing routes
const home = require("./routes/home");
const user = require("./routes/user");

//declaring routes for home
app.use("/api/v1", home);

//Declaring routes for user
app.use("/api/v1", user);

app.listen(process.env.PORT, () => {
  console.log(`The Server is running at PORT: ${process.env.PORT}`);
});
