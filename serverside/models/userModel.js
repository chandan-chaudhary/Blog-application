const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // unique: true,
    required: [true, 'a user must have user name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'a user must have email'],
    lowercase: true,
    validate: [validator.isEmail, 'please provide correct email'],
  },
  password: {
    type: String,
    required: [true, 'a user must have password'],
    minlength: [8, 'a password must have atleast 8 character'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'please confirm your password'],
    // select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password do not match',
    },
  },
  profilePic: {
    type: String,
    default: '',
  },
  createdAt: Date,
  updatedAt: Date,
  passwordResetToken: String,
  passwordExpiresIn: Date,
});

// Encrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

//reset Token
userSchema.methods.resetPasswordToken = function () {
  // simple token
  const resetToken = crypto.randomBytes(32).toString('hex');
  // encrypt token
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log(resetToken, this.resetPasswordToken);
  return resetToken;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
