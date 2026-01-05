const Joi = require('joi');
const payeService = require('../services/paye.service');
const vatService = require('../services/vat.service');

/**
 * Validation schema
 */
const taxRequestSchema = Joi.object({
  taxType: Joi.string()
    .valid('PAYE', 'VAT')
    .required(),

  grossIncome: Joi.number().positive().optional(),
  frequency: Joi.string().valid('monthly', 'annual').default('annual'),

  amount: Joi.number().positive().optional()
});

/**
 * POST /api/tax/calculate
 */
exports.calculateTax = async (req, res, next) => {
  try {
    const { value, error } = taxRequestSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    let result;

    switch (value.taxType) {
      case 'PAYE':
        result = await payeService.calculatePAYE(value);
        break;

      case 'VAT':
        result = await vatService.calculateVAT({ amount: value.amount });
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Unsupported tax type'
        });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
