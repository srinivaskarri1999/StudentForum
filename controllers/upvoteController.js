const Upvote = require('../models/upvoteModel');
const catchAsync = require('../utils/catchAsync');

exports.createUpvote = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const doc = await Upvote.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
