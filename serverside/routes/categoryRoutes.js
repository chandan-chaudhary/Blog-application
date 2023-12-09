const Router = require('express').Router();
const categoryController = require('../controller/categoryController');
Router.route('/')
  .get(categoryController.getAllCategory)
  .post(categoryController.createCategory);
