const express = require('express');
const postController = require('../controller/postController');
const Router = express.Router();

Router.route('/').get(postController.allPosts).post(postController.createPost);
Router.route('/:id')
  .get(postController.getSinglePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);
module.exports = Router;
