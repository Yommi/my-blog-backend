const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/signupAdmins').post(authController.signUpAdmins);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

router.use(authController.protect);
// ALL ROUTES AFTER THE ABOVE WILL BE PROTECTED

router.route('/updatePassword').patch(authController.updatePassword);

router
  .route('/getMe')
  .get(userController.MeMiddleware, userController.getUser);
router
  .route('/updateMe')
  .patch(userController.MeMiddleware, userController.updateUser);
router
  .route('/deleteMe')
  .delete(userController.MeMiddleware, userController.deleteUser);

router.use(authController.restrictTo('admin'));
// ALL ROUTES AFTER THE ABOVE WILL ONLY ACCESABLE BY ADMINS

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
