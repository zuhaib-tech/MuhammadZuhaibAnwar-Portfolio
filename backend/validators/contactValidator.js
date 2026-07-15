const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(1).max(2000).required(),
  hp: Joi.string().optional().allow('').max(0),
})

function validateContact(body) {
  return schema.validate(body, { abortEarly: false })
}

module.exports = { validateContact }
