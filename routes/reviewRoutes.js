const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const factory = require('./../controllers/factoryController');
const Review = require('./../models/reviewModel');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
// ALL ROUTES AFTER THE ABOVE WILL BE PROTECTED AND ONLY LOGGED IN USERS CAN ACCESS

// router
router
  .route('/')
  .post(factory.setUserBlogId, reviewController.createReview)
  .get(reviewController.getAllReviews);

router.route('/:id').get(reviewController.getReview);

module.exports = router;
