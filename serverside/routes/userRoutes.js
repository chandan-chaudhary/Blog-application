const express = require('express');
const userController = require('./../controller/userController');

const Router = express.Router();

Router.route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

Router.route('/:id')
  .get(userController.getUserbyId)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
