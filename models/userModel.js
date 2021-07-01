const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// const generateSlug = require('../utils/generateSlug');
// const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    rollNumber: String,
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    numberOfUpvotes: {
      type: Number,
      default: 0,
    },
    numberOfPosts: {
      type: Number,
      default: 0,
    },
    numberOfComplaints: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual properties
// userSchema.virtual('rollNumber').get(function () {
//   // email: imt_2017046@iiitm.ac.in

// });

// PRE MIDDLEWARE
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  // if (this.isNew) {
  //   const batch = this.email.substr(0, 3);
  //   const year = this.email.substr(4, 4);
  //   const no = this.email.substr(8, 3);
  //   const rollno = year.concat(`-${batch}`, no);
  //   this.rollNumber = rollno.toUpperCase();
  //   this.slug = this.rollNumber;
  // }
  // if (!this.isModified('password')) return next();

  // // Hash the password with cost of 12
  // this.password = await bcrypt.hash(this.password, 12);

  // // Delete passwordConfirm field
  // this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// INSTANCE METHODS
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
