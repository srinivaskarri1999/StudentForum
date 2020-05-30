const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');

exports.getBlog = async (req, res) => {
  if (!req.user) {
    res.status(200).render('login', {
      title: 'Sign in',
    });
  } else {
    // PLACE HOLDER
    res.locals.user.posts = await Blog.find({
      userId: req.user.id,
      blogType: 'article',
    });
    res.locals.user.complaints = await Blog.find({
      userId: req.user.id,
      blogType: 'complaint',
    });
    // console.log(res.locals.user.complaints);
    res.status(200).render('myDashboard', {
      title: 'My Dahsboard',
    });
  }
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Register',
  });
};

exports.getForgotPasswordForm = (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot password',
  });
};

exports.getMyDashboard = async (req, res) => {
  res.locals.user.posts = await Blog.find({
    userId: req.user.id,
    blogType: 'article',
  });
  res.locals.user.complaints = await Blog.find({
    userId: req.user.id,
    blogType: 'complaint',
  });
  res.status(200).render('myDashboard', {
    title: 'My dashboard',
  });
};

exports.getMyPost = async (req, res) => {
  res.locals.user.posts = await Blog.find({
    userId: req.user.id,
    blogType: 'article',
  });
  res.locals.user.complaints = await Blog.find({
    userId: req.user.id,
    blogType: 'complaint',
  });
  res.locals.post = await Blog.findOne({ slug: req.params.postId });
  res.locals.comments = await Comment.find({ blog: res.locals.post.id });
  res.status(200).render('myDashboard', {
    title: 'post',
  });
};

exports.getMyBlogs = async (req, res) => {
  res.locals.posts = await Blog.find({
    blogType: 'article',
  });
  res.status(200).render('blog', {
    title: 'Blog',
  });
};

exports.getMyBlog = async (req, res) => {
  res.locals.posts = await Blog.find({
    blogType: 'article',
  });
  res.locals.post = await Blog.findOne({ slug: req.params.postId });
  res.locals.comments = await Comment.find({ blog: res.locals.post.id });
  res.status(200).render('blog', {
    title: 'Blog',
  });
};

exports.getComplaints = async (req, res) => {
  res.locals.posts = await Blog.find({
    blogType: 'complaint',
  });
  res.status(200).render('complaint', {
    title: 'Complaints',
  });
};

exports.getComplaint = async (req, res) => {
  res.locals.posts = await Blog.find({
    blogType: 'article',
  });
  res.locals.post = await Blog.findOne({ slug: req.params.postId });
  res.locals.comments = await Comment.find({ blog: res.locals.post.id });
  res.status(200).render('complaint', {
    title: 'Blog',
  });
};
