const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // for (const blog of blogData) {
  //   await Blog.create({
  //     ...blog
  //   });
  // }

  // for (const comment of commentData) {
  //   await Comment.create({
  //     ...comment
  //   });
  // }

  try {
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  } catch (err) {
    console.log(err);
  };

  try {
    await Blog.bulkCreate(blogData);
  } catch (err) {
    console.log(err);
  };
  
  try {
    await Comment.bulkCreate(commentData);
  } catch (err) {
    console.log(err);
  };

  process.exit(0);
};

seedDatabase();