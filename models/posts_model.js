const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postsSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    }
  }, {
    versionKey: false  // Disable versioning
  });
const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;
