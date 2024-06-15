const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const authController = require('./../controllers/authController');

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (Model === User) {
      return authController.createSendToken(doc, 200, res);
    }

    res.status(201).json({
      status: 'created',
      data: {
        doc,
      },
    });
  });
};

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docs = await Model.find();

    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        docs,
      },
    });
  });
};

exports.getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);

    if (Model === User) {
      query = await query.populate(popOptions);
    }

    if (!query) {
      return next(
        new AppError(`There is no document with id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        query,
      },
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    if (Model === User) {
      if (req.body.password) {
        return next(
          new AppError(
            `${req.originalUrl} cannot update passwords! Please use: /api/v1/users/updatePassword`
          )
        );
      }
    }

    const updatedDoc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDoc) {
      return next(new AppError("Couldn't update document", 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        updatedDoc,
      },
    });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`There is no document with id: ${req.params.id}`, 404)
      );
    }

    res.status(204).json({
      status: 'deleted',
      data: null,
    });
  });
};

exports.setUserBlogId = (req, res, next) => {
  req.body.user = req.user.id;

  if (req.params.blogId) {
    req.body.blog = req.params.blogId;
  }

  next();
};
