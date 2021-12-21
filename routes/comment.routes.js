const router = require("express").Router();
const { protect } = require("../middleware/authmidleware");
const Comment = require("../models/commentModel");
//CREATE POST

router.post("/post/:id", protect, async (req, res) => {
  const newComment = new Comment({
    postId: req.params.id,
    userId: req.body.userId,
    desc: req.body.comment,
  });

  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE POST
router.put("/:id", protect, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  try {
    if (comment.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("comment updated");
    } else {
      res.status(403).json("you can update only your comment");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//DELETE POST
router.delete("/:id", protect, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  try {
    if (comment.userId === req.body.userId) {
      await comment.deleteOne();
      res.status(200).json("comment deleted");
    } else {
      res.status(403).json("you can delete only your comment");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
