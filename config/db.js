const mongoose = require("mongoose");
const connectWithDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URL)
    .then(console.log("DB Connected Succesfully"))
    .catch((err) => {
      console.error("DB connection issue");
      console.log(err);
      process.exit(1);
    });
};
module.exports = connectWithDB;
