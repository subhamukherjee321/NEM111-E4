require("dotenv").config();
const port = process.env.port;

const express = require("express");
const connection = require("./Config/db");
const userRouter = require("./Routes/User.Route");
const validator = require("./Middleware/validation.middleware")
const postsRouter = require("./Routes/Posts.Route");

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", validator, postsRouter);

app.get("/", (req, res) => {
  res.status(201).send("Welcome to Social Media Register First");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected To DB");
  } catch (err) {
    console.log({
      err,
      message: "Somthing Went Wrong When Connecting To The DB",
    });
  }
  console.log(`Server Running At ${port}`);
});
