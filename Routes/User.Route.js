require("dotenv").config();
const key = process.env.scretKey;

const { Router } = require("express");
const UsersModel = require("../Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = Router();

user.get("/", (req, res) => {
  res.status(201).send("Wwelcome To User Page");
});

user.post("/register", async (req, res) => {
  const { name, age, email, password } = req.body;
  try {
    const newUser = await UsersModel.find({ email });
    if (newUser.length > 0) {
      res.status(400).send("Already Registered");
    } else {
      const pass = await bcrypt.hash(password, 5);
      await UsersModel.create({ name, email, age, password: pass });
      res.status(201).send({status: "success", message: "Successfully Registered"});
    }
  } catch (err) {
    res.status(401).send({
      err: err.message,
      message: "Somthing Went Wrong While Registering",
    });
  }
});

user.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UsersModel.findOne({ email });
    if (!user) {
      res.status(400).send({ message: "Register First" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        let token = jwt.sign({ id: user._id }, key, { expiresIn: "1h" });
        res.status(201).send({ message: "Login Success", token });
      } else {
        res.status(400).send({ message: "Wrong Credential" });
      }
    }
  } catch (err) {
    res
      .status(401)
      .send({ err: err.message, message: "Somthing Went Wrong While Login" });
  }
});

module.exports = user;
