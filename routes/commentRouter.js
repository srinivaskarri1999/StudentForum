const express = require('express');
const commentController = require('../controllers/commentController');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const Comment = require('../models/commentModel');
// TODO implement revieRouter and uncomment below line
// const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

router
  .route('/mycomment/:id')
  .patch(
    authController.protect,
    authController.checkUser(Comment),
    commentController.updateMyComment
  );

router
  .route('/')
  .get(commentController.getAllComments)
  .post(
    authController.protect,
    blogController.checkBlogStatus,
    commentController.createComment
  );

router
  .route('/:id')
  .get(commentController.getComments)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    commentController.updateComment
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    commentController.deleteComment
  );

module.exports = router;
