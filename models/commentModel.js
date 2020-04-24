const mongoose = require('mongoose');
const moment = require('moment');
const generateSlug = require('../utils/generateSlug');
// const slugify = require('slugify');

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
      required: [true, 'Comment must belong to a post'],
    },
    parentComment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
      default: undefined,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
    text: {
      type: String,
      trim: true,
      required: 'Comment cannot be Empty!',
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    postedAt: {
      type: Date,
      default: Date.now(),
    },
    slug: String,
    fullSlug: String,
    deleteStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//INDEXING
commentSchema.index({ blog: 1, postedAt: 1 });
commentSchema.index({ blog: 1, fullSlug: 1 });

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo rollNumber',
  });
  next();
});

commentSchema.pre('save', function (next) {
  if (!this.isNew) return next();
  const timeStamp = moment(this.postedAt).format('YYYY.MM.DD.hh:mm:ss');
  const slugPart = generateSlug();
  const fullSlugPart = timeStamp.concat(':', slugPart);

  if (this.parentComment) {
    this.constructor
      .findOne({ _id: this.parentComment }, { slug: 1, fullSlug: 1 })
      .then((parent) => {
        this.slug = parent.slug.concat('/', slugPart);
        this.fullSlug = parent.fullSlug.concat('/', fullSlugPart);
        next();
      });
  } else {
    this.slug = slugPart;
    this.fullSlug = timeStamp.concat(':', slugPart);
    next();
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
