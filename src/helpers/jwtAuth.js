const jwt = require('jsonwebtoken');
class JwtAuth {
    // generate access token valid for 3min == 180s
     generateAccessToken(user) {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '180s' })
    }
}

const jwtAuthObj = new JwtAuth();
module.exports = jwtAuthObj; 