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

module.exports = router;