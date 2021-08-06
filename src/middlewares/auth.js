const jwt = require('jsonwebtoken');
const User = require('../models/User');
class Auth {
  //checks wheather the token is valid
   authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send({error:'Unauthorised Access'});    
    //verify jwt token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send({error:'Forbidden'});
      res.locals.userEmail = user.email;
      next();
    })
  }
  
}

module.exports = Auth;