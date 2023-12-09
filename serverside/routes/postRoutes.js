const express = require('express');
const postController = require('../controller/postController');
const authController = require('../controller/authController');
const Router = express.Router();

Router.route('/')
  .get(authController.protectRoutes, postController.allPosts)
  .post(postController.createPost);
Router.route('/:id')
  .get(postController.getSinglePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);
module.exports = Router;
