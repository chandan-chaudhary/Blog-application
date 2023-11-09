const bcrypt = require('bcryptjs');
const sendMail = require('./../email');

const User = require('./../models/userModel');

//register user
exports.signUp = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
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

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('email or passwowrd is missing');

    const user = await User.findOne({ email });
    const validatePass = await bcrypt.compare(password, user.password);
    console.log(validatePass);

    if (!user || !validatePass)
      throw new Error('Email or password is not valid');
    res.status(200).json({
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

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('no user found');
    const resetToken = user.resetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const tokenURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetpassword/${resetToken}`;
    const message = `Please reset your password ${tokenURL}, valid for 10 min.\n If please ignore if already done`;
    console.log(tokenURL);
    await sendMail({
      email: user.email,
      subject: 'passwowrd reset token ',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'mail sent on gmail',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
