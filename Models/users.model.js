const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    gender: String,
    email: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const UsersModel = mongoose.model("user", userSchema);

module.exports = UsersModel;
