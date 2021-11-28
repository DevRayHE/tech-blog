const router = require('express').Router();
const { Comment } = require('../../models');

// Route to create a new comment
router.post('/', async (req, res) => {
  try {

    console.log(req.body.content);
    console.log(req.body.blogId);
    console.log(req.session.user_id);
    console.log(req.session.username);

    const newComment = await Comment.create({
      content: req.body.content,
      blog_id: req.body.blogId,
      user_id: req.session.user_id,
      username: req.session.username,
    });

    // if(response.ok) {
    //   document.location.replace('/blog/' + req.body.blogId);
    //   alert("Comment updated successful!");
    // } else {
    //   alert("Failed to make new comment!");
    // }

    res.status(200).json(newComment);
    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;

    //   res.status(200).json({ user: userData, message: "Sign up successful and logged in!" }  );
    // });
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;