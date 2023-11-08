const mongoose = require('mongoose');
const User = require('../models/userModel');
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
    required: [true, 'a post must have post details'],
  },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: [true, 'a post must belongs to user'],
  // },
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
