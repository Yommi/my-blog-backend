const express = require('express');
const authController = require('./../controllers/authController');
const blogController = require('./../controllers/blogController');
const factory = require('./../controllers/factoryController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:blogId/reviews', reviewRouter);

router.use(authController.protect);
// ALL ROUTES AFTER THE ABOVE WILL BE PROTECTED AND ONLY LOGGED IN USERS CAN ACCESS

router
  .route('/')
  .post(factory.setUserBlogId, blogController.createBlog)
  .get(blogController.getAllBlogs);

module.exports = router;
