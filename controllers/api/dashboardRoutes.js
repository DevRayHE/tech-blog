const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to display form to create new post
router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('newBlog')
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new post
router.post('/', withAuth,  async (req, res) => {
  try {

    console.log(req.body);
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      }
    })

    if (!deleteBlog) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json(deleteBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;