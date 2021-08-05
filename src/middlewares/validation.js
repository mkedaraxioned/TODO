const Joi = require('joi');
const validateData = (schema) => {
  return(req,res,next) => {
    const data = req.body;
    const { error } = schema.validate(data);
    if(error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      console.log(`error ${message}`);
      return res.status(422).send({error: message});
    }
    next();
  }
}

module.exports = validateData;