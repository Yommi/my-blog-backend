const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'There has to be a review'],
  },
  rating: {
    type: Number,
    required: [true, 'A review must have a rating'],
  },
  blog: {
    type: mongoose.Schema.ObjectId,
    ref: 'Blog',
    required: [true, 'A review must belong to a blog'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A review must belong to a user'],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'blog',
    select: '_id',
  }).populate({
    path: 'user',
    select: '_id',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
