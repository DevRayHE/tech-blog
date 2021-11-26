const router = require('express').Router();
const { Blog, User} = require('../models');
const withAUth = require('../utils/auth');

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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    // Get blog data with match id from req body
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blog = blogData.get({ plan: true });

    res.render('blog', {
      ...blog
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;