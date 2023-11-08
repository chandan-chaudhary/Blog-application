const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'a user must have user name'],
  },
  email: {
    type: String,
    required: [true, 'a user must have email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide correct email'],
  },
  password: {
    type: String,
    required: [true, 'a user must have password'],
    min: [8, 'a password must have atleast 8 character'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'please confirm your password'],
    select: false,
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
});

// Encrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();

  this.confirmPassword = undefined;
});
const User = mongoose.model('User', userSchema);
module.exports = User;
