const User = require('./../models/User');
// const jwt = require('jsonwebtoken');
// const jwtAuthObj = require('./../utils/jwtAuth');
class UserController {
  signUpUser = async (req,res,next) => {
    try { 
    const user = {
      name: req.body.name,
      email:req.body.email,
      password: req.body.password
    };
    const newUser = await User.create(req.body);
    return res.status(201).send({msg:'User added Successfully',user:newUser});
    } catch(error) { 
    next(error);
    }

  }
}

module.exports = UserController;