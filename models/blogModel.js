const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A blog must have a title'],
  },
  body: {
    type: String,
    required: [true, 'A blog must have a body'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A blog must belong to a user'],
  },
});

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'userName profilePicture',
  });

  next();
});

const Blog = new mongoose.model('Blog', blogSchema);

module.exports = Blog;
