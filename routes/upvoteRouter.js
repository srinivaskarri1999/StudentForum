const express = require('express');
const upvoteController = require('../controllers/upvoteController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', upvoteController.checkID);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

router.route('/').post(authController.protect, upvoteController.createUpvote);

module.exports = router;
