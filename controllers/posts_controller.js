const Posts = require("../models/posts_model");
const { ObjectId } = require("mongoose");
const getAllPosts = async (req, res) => {
  const filter = req.query;  // filter query parameters
  console.log('Received filter:', filter); 

  try {
    let posts;

    //  filter by owner
    if (filter.owner) {
 
      // search posts for the specified owner
      posts = await Posts.find({ owner: filter.owner });

      // If no posts are found for the given owner
      if (posts.length === 0) {
        return res.status(404).send("No posts found for the specified owner.");
      }
    } else {
      // If no owner filter is applied
      posts = await Posts.find();

      // If no posts are found
      if (posts.length === 0) {
        return res.status(404).send("No posts available.");
      }
    }

    // Return the posts if they were found
    console.log("Found posts:", posts);  
    return res.send(posts);

  } catch (err) {
    // Catch unexpected errors
    console.error("Error fetching posts:", err.message);
    return res.status(500).send({ message: "Server error while fetching posts", error: err.message });
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const post = await Posts.findById(id);
      if (post) {
        return res.send(post);
      } else {
        return res.status(404).send("Post not found");
      }
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
  return res.status(400).send(err.message);
};

const createPost = async (req, res) => {
  console.log(req.body);
  try {
    const post = await Posts.create(req.body);
    res.status(201).send(post);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deletePost = (req, res) => {
  res.send("delete a post");
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getPostById,
};
