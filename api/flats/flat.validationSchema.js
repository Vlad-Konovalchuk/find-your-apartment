const Joi = require('joi')
const flatSchema = Joi.object().keys({
  title: Joi.string().required,
  description: Joi.string().required(),
  bathrooms: Joi.string().required(),
  bedrooms: Joi.string().required(),
  price: Joi.number().required(),
  isDiscount: Joi.string().required()
});
module.exports = flatSchema;
