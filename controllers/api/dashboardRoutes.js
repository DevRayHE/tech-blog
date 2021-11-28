const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to display form to create new post
router.get('/new', withAuth, async (req, res) => {
  try {

    const newBlog = true;

    res.render('blogForm', {
      newBlog,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display current blog form with value to edit
router.get('/edit/:id', withAuth, async (req, res) => {
  try {

    const blogData = await Blog.findByPk(req.params.id);
    const blog = blogData.get({ plan: true });
    const editBlog = true;

    res.render('blogForm', {
      ...blog,
      editBlog,
      username: req.session.username,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a post
router.post('/update/:id', withAuth,  async (req, res) => {
  try {

    console.log(req.body);
    const updatedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    );

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(400).json(err);
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


// Delete a post
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