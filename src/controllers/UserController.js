const User = require('./../models/User');
// const jwt = require('jsonwebtoken');
const jwtAuthObj = require('./../helpers/jwtAuth');
class UserController {
  signUpUser = async (req,res,next) => {
    try { 
    const user = {
      name: req.body.name,
      email:req.body.email,
      password: req.body.password
    };
    const newUser = await User.create(req.body);
    return res.status(201).send({message:'User added Successfully',user:newUser});
    } catch(error) { 
    next(error);
    }

  }

  loginUser = async(req,res,next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(401).send({error:'Invalid credentials'});    
      const user = await User.findOne({ email }).select('+password');
      if (!user) return res.status(401).send({error:'Invalid credentials'});
       // Check if password is valid
      const isMatch = await user.matchPassword(password);
      if (isMatch) {
        const token = jwtAuthObj.generateAccessToken({ email }); 
        return res.status(200).send({ message:'Logged In',token}); 
      } else {
        return res.status(401).send({error:"Invalid credetials"});
      }
    } catch (error) {
        next(error);
    }
  }

 
}

module.exports = UserController;