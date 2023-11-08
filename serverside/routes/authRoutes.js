const Router = require('express').Router();
const authController = require('./../controller/authController');

Router.route('/register').post(authController.signUp);
module.exports = Router;
