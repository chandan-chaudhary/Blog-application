const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, ' a post must have a title'],
  },
  photo: {
    type: String,
  },
  summary: {
    type: String,
    required: [true, 'a post should have summary'],
  },
  categories: {
    type: String,
    enum: ['life', 'crypto', ' music', ' technology'],
  },
  description: {
    type: String,
    required: [true, 'A post must have post details'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A post must belongs to user'],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'A Post must specify the category'],
  },
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'username profilePic',
  });
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
