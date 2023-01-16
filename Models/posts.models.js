const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device : String,
    userID: String
  },
  {
    versionKey: false,
  }
);

const PostsModel = mongoose.model("post", postSchema);

module.exports = PostsModel;

/*{
    "title": "NEM111",
    "body": "BACKEND",
    "device": "MOBILE"
  }*/