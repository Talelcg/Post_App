const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts_controller");

router.post("/", postsController.createPost);
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.delete("/:id", postsController.deletePost);
router.put("/:id", postsController.updatePost);

module.exports = router;