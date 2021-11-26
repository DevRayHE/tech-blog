const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// One to many relationships between user and blog
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

ExerciseRecord.belongsTo(User, {
  foreignKey: 'user_id'
});

// One to many relationships between user and comment
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});


// One to many relationships between blog and comment
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment};