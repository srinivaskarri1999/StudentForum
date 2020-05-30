const express = require('express');
const viewsController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(viewsController.alerts);
router.use(authController.isLoggedIn);

router.get('/', viewsController.getBlog);
router.get('/signup', viewsController.getSignupForm);
router.get('/forgotPassword', viewsController.getForgotPasswordForm);
router.get(
  '/myDashboard',
  authController.protect,
  viewsController.getMyDashboard
);
router.get('/blog', viewsController.getMyBlogs);
router.get('/complaint', viewsController.getComplaints);
router.get('/complaint/:postId', viewsController.getComplaint);
router.get('/blog/:postId', viewsController.getMyBlog);
router.get('/my/posts/:postId', viewsController.getMyPost);

module.exports = router;
