const express = require('express');
const router = express.Router({ mergeParams:true });
const UserController = require('../controllers/UserController');
const userControllerObj = new UserController();
const errorHandler = require('../middlewares/error');
// joi validation schemas
const schemas = require('../helpers/schema'); 
const validateData = require('../middlewares/validation');

router.route('/')
  .post(validateData(schemas.user),userControllerObj.signUpUser,errorHandler);

module.exports = router;
