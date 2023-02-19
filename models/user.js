const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required "],
    maxLenght: [40, "Name can't be greater than 40 character"],
  },
});
module.exports = mongoose.model("user", userSchema);
