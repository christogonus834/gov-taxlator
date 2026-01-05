const Joi = require('joi');

exports.taxRequestSchema = Joi.object({
  taxType: Joi.string()
    .valid('PAYE', 'PIT', 'FREELANCER', 'CIT')
    .required(),

  grossIncome: Joi.number().positive().precision(2).required(),

  frequency: Joi.string().valid('monthly', 'annual').default('annual'),

  pension: Joi.boolean().default(true),
  nhf: Joi.boolean().default(false),

  allowances: Joi.number().min(0).precision(2).optional(),
  expenses: Joi.number().min(0).precision(2).optional(),
  turnover: Joi.number().min(0).precision(2).optional(),
  profit: Joi.number().precision(2).optional()
}).custom((value, helpers) => {
  // same custom logic you already wrote
  return value;
});
