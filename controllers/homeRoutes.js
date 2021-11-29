const router = require('express').Router();
const { Blog, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

// Route to render home page
router.get('/', async (req, res) => {
  try {
    // Get all blog data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use the custom middleware before allowing the user to access blog
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    // Get blog data with match id from req params
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
    });

    const blog = blogData.get({ plan: true });
    const blogUser = blog.user.get({ plan:true });

    // Get all comment belongs to the blog with match id from req params
    const commentData = await Comment.findAll({
      where: {
        blog_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('blog', {
      ...blog,
      blogUser,
      comments,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use the custom middleware before allowing the user to access dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to dashboard
  if (req.session.logged_in) {
    res.redirect('/api/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;