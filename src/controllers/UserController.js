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
      const user = await User.find({ email:req.body.email });
      if(!user || user == null || user=="") return res.status(401).send({error:"Invalid credetials"});
      user.forEach((suser,i)=> {
        if(suser.password === req.body.password) {
          const token = jwtAuthObj.generateAccessToken({email:req.body.email}); 
          return res.status(200).send({ message:'success',token});   
        } else {
          return res.status(401).send({error:"Invalid credetials"});
        }
      });         
    } catch (error) {
        next(error);
    }
  }

 
}

module.exports = UserController;