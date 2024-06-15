const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const factory = require('./factoryController');

exports.createUser = factory.createOne(User);

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User, {
  path: 'blogs',
  select: '_id',
});

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.MeMiddleware = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
