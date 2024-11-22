const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts_controller");

// Get all posts
router.get("/", postsController.getAllPosts);

// Get a single post by ID
router.get("/:id", postsController.getPostById);



///////////////////////////////////////////////////////////////////////

// Create a new post
router.post("/", postsController.createPost);

//delete post
router.delete("/:id", postsController.deletePost);

// Update an existing post
//router.put("/:id", postsController.updatePost);

module.exports = router;