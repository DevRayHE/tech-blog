const router = require('express').Router();
const { Blog, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

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
        // {
        //   model: Comment,
        //   include: [{ 
        //     model: User,
        //   },]
        // },
      ],
    });

    // console.log(blogData);
    const blog = blogData.get({ plan: true });
    // console.log(blog);
    const blogUser = blog.user.get({ plan:true });
    console.log(blogUser);
    
    // const blogComment = blog.comment.map((comment) => comment.get({ plain: true }));
    // console.log(blogComment);


    // const blogUser = blog.user.get({ plan: true });
    // console.log(blogUser);
    
    // console.log(blogComment);

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
    console.log(comments);
    // const commentUser = comment.user.map((commentUser) => commentUser.get({ plain: true }));
    // console.log(commentData);
    // console.log(commentUser);
    

    // res.render('blog', {
    //   blog,
    //   blogUser,
    //   blogComment
    // });

    res.render('blog', {
      ...blog,
      blogUser,
      comments,
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

    console.log(blogData);
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to dashboard
  if (req.session.logged_in) {
    // res.redirect('/dashboard');
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});


module.exports = router;