const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/commentModel');
const AppError = require('../utils/appError');

exports.getAllComments = factory.getAll(Comment);
exports.updateComment = factory.updateOne(Comment);

exports.deleteComment = catchAsync(async (req, res, next) => {
  req.body.text = 'Deleted by admin';
  req.body.deleteStatus = true;
  const doc = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const doc = await Comment.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getComments = catchAsync(async (req, res, next) => {
  const check = await Comment.find({ blog: req.params.id });

  if (!check) {
    return next(new AppError('No document found with that ID', 404));
  }
  const doc = await Comment.find({ blog: req.params.id }).sort('fullSlug');

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.updateMyComment = catchAsync(async (req, res, next) => {
  const fak = await Comment.findById(req.params.id);

  if (!fak) {
    return next(new AppError('No document found with that ID', 404));
  }

  if (fak.deleteStatus === true) {
    return next(new AppError('You cannot edit this comment', 400));
  }

  const doc = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
