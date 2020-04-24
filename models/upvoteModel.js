const mongoose = require('mongoose');
const Blog = require('./blogModel');
const User = require('./userModel');

const upvoteSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
      required: [true, 'upvote must belong to a post'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'upvote must belong to a user'],
    },
    vote: {
      type: Number,
      default: 0,
      max: 1,
      min: -1,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//INDEXING
upvoteSchema.index({ user: 1, blog: 1 }, { unique: true });

upvoteSchema.statics.calcUpvotesByBlog = async function (blogId) {
  const stats = await this.aggregate([
    {
      $match: { blog: blogId },
    },
    {
      $group: {
        _id: '$blog',
        nUpvotes: { $sum: '$vote' },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Blog.findByIdAndUpdate(blogId, {
      upvotes: stats[0].nUpvotes,
    });
  } else {
    await Blog.findByIdAndUpdate(blogId, {
      upvotes: 0,
    });
  }
};

upvoteSchema.statics.calcUpvotesForUser = async function (blogId) {
  const { userId } = await Blog.findById(blogId);
  // console.log(blog);
  const doc = await Blog.aggregate([
    {
      $match: { userId },
    },
    {
      $group: {
        _id: '$userId',
        nUpvotes: { $sum: '$upvotes' },
      },
    },
  ]);

  if (doc.length > 0) {
    await User.findByIdAndUpdate(userId, {
      numberOfUpvotes: doc[0].nUpvotes,
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      numberOfUpvotes: 0,
    });
  }
};

// POST MIDDLEWARE
upvoteSchema.post('save', function () {
  // this points to current review
  this.constructor.calcUpvotesByBlog(this.blog);
  this.constructor.calcUpvotesForUser(this.blog);
});

const Upvote = mongoose.model('Upvote', upvoteSchema);

module.exports = Upvote;
