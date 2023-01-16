const { Router } = require("express");
const PostsModel = require("../Models/posts.models");

const posts = Router();

posts.get("/", async (req, res) => {
  let userID = req.body.userID;
  try {
    let data = await PostsModel.find({ userID });
    res.status(201).send(data);
  } catch (err) {
    res.status(401).send({
      error: err.message,
      message: "Somthing Went Wrong While Getting The Data",
    });
  }
});

posts.post("/addpost", async (req, res) => {
  const payload = req.body;
  const { title } = payload;
  console.log("payload: ", payload);
  try {
    let search = await PostsModel.find({ title });
    if (search.length > 0) {
      res.send("Already Exist");
    } else {
      const post = new PostsModel(payload);
      await post.save();
      console.log(post);
      res.send({ message: "Posted Successfully" });
    }
  } catch (err) {
    res.send({
      error: err.message,
      message: "Somthing Went Wrong While Posting",
    });
  }
});

posts.patch("/updatepost/:id", async (req, res) => {
  let payload = req.body;
  let { userID } = payload;
  let ID = req.params.id;
  let post = await PostsModel.findOne({ _id: ID });
  try {
    if (userID === post.userID) {
      await PostsModel.findByIdAndUpdate({ _id: ID }, payload);
      res.send({ status: "Success", message: "Post Updated" });
    } else {
      res.send("Not Authorized");
    }
  } catch (err) {
    res.send({
      error: err.message,
      message: "Something Went Wrong While Updating",
    });
  }
});

posts.delete("/delete/:id", async (req, res) => {
  let { userID } = req.body;
  let ID = req.params.id;
  let post = await PostsModel.findOne({ _id: ID });

  try {
    if (userID === post.userID) {
      await PostsModel.findByIdAndDelete({ _id: ID });
      res.send("Deleted The Post");
    } else {
      res.send({ msg: "You Are Not Authorized" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = posts;
