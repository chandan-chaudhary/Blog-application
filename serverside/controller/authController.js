const bcrypt = require('bcryptjs');

const User = require('./../models/userModel');

//register user
exports.signUp = async (req, res) => {
  try {
    const user = User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
    });
    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
