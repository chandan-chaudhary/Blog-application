const express = require('express');
const userController = require('./../controller/userController');

const Router = express.Router();
const authController = require('./../controller/authController');

Router.route('/register').post(authController.signUp);
Router.route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

Router.route('/:id')
  .get(userController.getUserbyId)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
