const Joi = require('joi');

exports.vatRequestSchema = Joi.object({
  salesAmount: Joi.number().min(0).precision(2).required(),
  purchaseAmount: Joi.number().min(0).precision(2).default(0)
}).custom((value, helpers) => {
  if (value.salesAmount === 0 && value.purchaseAmount === 0) {
    return helpers.message('Both sales and purchase amounts cannot be zero');
  }
  return value;
});
