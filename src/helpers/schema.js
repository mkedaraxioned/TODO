const Joi = require('joi');
const schemas = {
  user: Joi.object({
    name: Joi.string()
    .min(3)
    .max(30)
    .required(),    
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  }),
  note: Joi.object({
    content: Joi.string(),
    status: Joi.string()
    .valid('incomplete','complete'),
    onDate: Joi.date()
  })
}

module.exports = schemas;