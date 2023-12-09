const bcrypt = require('bcryptjs');
const sendMail = require('./../email');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const { promisify } = require('util');

// CREATE JWT
const createToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRE_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;

  res.cookie('jwt', token, cookieOption);
  return token;
};

//register user
exports.signUp = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = createToken(user._id, res);
    user.password = undefined;
    res.status(201).json({
      status: 'success',
      token,
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

    const token = createToken(user._id, res);
    user.password = undefined;
    console.log('cookie =>', req.headers.authorization);
    res.status(200).json({
      status: 'success',
      token,
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
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new Error('no user found');
  const resetToken = user.resetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const tokenURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetpassword/${resetToken}`;
  const message = `Please reset your password ${tokenURL}, valid for 10 min.\n If please ignore if already done`;
  console.log('for', resetToken, user.passwordResetToken);
  try {
    await sendMail({
      email: user.email,
      subject: 'password reset token ',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'mail sent on gmail',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordExpiresIn = undefined;
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // const token = req.params.token;
    const recivedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    const user = await User.findOne({
      passwordResetToken: recivedToken,
      passwordExpiresIn: { $gt: Date.now() },
    });
    console.log('>', req.params.token, recivedToken);
    if (!user) throw new Error('no user match');
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordExpiresIn = undefined;
    await user.save();
    res.status(200).json({
      status: 'success',
      message: 'password has been changed',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// PROTECT ROUTES
exports.protectRoutes = async (req, res, next) => {
  try {
    // GET TOKEN
    let token;
    console.log(req.headers);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) throw new Error('please login again');
    console.log(token);

    // VERIFY TOKEN
    const verificationID = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_TOKEN
    );
    console.log(verificationID);
    const loggedUser = await User.findById(verificationID.id);
    if (!loggedUser) throw new Error('No user found');
    loggedUser.passwordupdated;
    if (loggedUser.isPasswordUpdated(verificationID.iat))
      throw new Error('Authentication failed, Please login again!');

    // GIVE ACCESS to LOGGED user
    req.user = loggedUser;
    // next();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
  next();
};
