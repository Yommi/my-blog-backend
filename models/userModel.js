const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      default: function () {
        return this.email;
      },
    },
    email: {
      type: String,
      required: [true, 'A user must have an email address'],
      validate: [
        validator.isEmail,
        'Please provide a valid email address',
      ],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A user must confirm their password'],
      validate: {
        validator: function (confirm) {
          return confirm === this.password;
        },
        message: "Passwords aren't the same",
      },
    },
    profilePicture: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['reader', 'author', 'admin'],
      default: 'reader',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.virtual('blogs', {
  ref: 'Blog',
  foreignField: 'user',
  localField: '_id',
});

// To ENCRYPT PASSWORD ON CREATION OR MODIFICATION
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  unencryptedPassword,
  encryptedPassword
) {
  return await bcrypt.compare(unencryptedPassword, encryptedPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimeStamp < changedTimeStamp;
  }
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
