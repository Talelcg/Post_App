const express = require("express");
const router = express.Router();

const postsController = require("../controllers/comments_controller");

router.post('/', postsController.createComment);
router.get('/', postsController.getAllComments);
router.get('/post/:postId',postsController.getCommentsByPost);
router.get("/:id", postsController.getCommentById);
router.delete('/:id', postsController.deleteComment);
router.put('/:id', postsController.updateComment);

module.exports = router;
