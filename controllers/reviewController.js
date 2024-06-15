const Review = require('./../models/reviewModel');
const factory = require('./../controllers/factoryController');

exports.createReview = factory.createOne(Review);

exports.getAllReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);
