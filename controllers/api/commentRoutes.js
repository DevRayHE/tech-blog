const router = require('express').Router();
const { Comment } = require('../../models');

// Route to create a new comment
// router.post('/', async (req, res) => {
//   try {
//     console.log(req.body);
//     const commentData = await Comment.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json({ comment: commentData, message: "Comment made successful!" }  );
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;