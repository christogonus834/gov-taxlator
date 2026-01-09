const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false
    },

    verified: {
      type: Boolean,
      default: false
    },

    verificationCode: {
      type: String,
      select: false
    },

    verificationCodeValidation: {
      type: Number,
      select: false
    },

    forgotPasswordCode: {
      type: String,
      select: false
    },

    forgotPasswordCodeValidation: {
      type: Number,
      select: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
