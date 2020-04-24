const Blog = require('../models/blogModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllBlogs = factory.getAll(Blog);
exports.getBlog = factory.getOne(Blog);
exports.updateBlog = factory.updateOne(Blog);
exports.deleteBlog = factory.deleteOne(Blog);
exports.getArticle = factory.getAll(Blog, 'article');
exports.getComplaint = factory.getAll(Blog, 'complaint');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createBlog = catchAsync(async (req, res, next) => {
  const newFilteredObj = filterObj(
    req.body,
    'title',
    'tags',
    'text',
    'blogType'
  );
  newFilteredObj.user = req.user.id;
  const doc = await Blog.create(newFilteredObj);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.updateMyBlog = catchAsync(async (req, res, next) => {
  const newFilteredObj = filterObj(req.body, 'title', 'tags', 'text');
  newFilteredObj.changedAt = Date.now();
  const doc = await Blog.findByIdAndUpdate(req.params.id, newFilteredObj, {
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

exports.checkBlogStatus = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.body.blog);

  if (!blog) {
    return next(new AppError('No document found with that ID', 404));
  }

  if (blog.blogStatus === 'close')
    return next(
      new AppError(
        'this post is closed by admin,you cannot perform this action',
        401
      )
    );
  next();
});
