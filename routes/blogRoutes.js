const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const Blog = require('../models/blogModel');
// TODO implement revieRouter and uncomment below line
// const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

// router.param('id', blogController.checkID);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

// TODO after implementing comments edit below line
// router.use('/:tourId/reviews', reviewRouter);

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(authController.protect, blogController.createBlog);

router.route('/article').get(blogController.getArticle);
router.route('/complaint').get(blogController.getComplaint);
router
  .route('/mypost/:id')
  .post(
    authController.protect,
    authController.checkUser(Blog),
    blogController.updateMyBlog
  )
  .delete(
    authController.protect,
    authController.checkUser(Blog),
    blogController.deleteBlog
  );

router
  .route('/:id')
  .get(blogController.getBlog)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.updateBlog
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.deleteBlog
  );

module.exports = router;
