const factory = require('./factoryController');
const Blog = require('../models/blogModel');

exports.createBlog = factory.createOne(Blog);

exports.getAllBlogs = factory.getAll(Blog);
