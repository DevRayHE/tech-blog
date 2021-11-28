const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      blog_id: req.body.blogId,
      user_id: req.session.user_id,
      username: req.session.username,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;