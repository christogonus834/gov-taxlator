//VAT Controller

const Joi = require('joi');
const vatService = require('../services/vat.service');

// VAT Calculation Request Schema
const vatRequestSchema = Joi.object({
  salesAmount: Joi.number()
    .min(0)
    .max(999999999999)
    .precision(2)
    .required()
    .messages({
      'any.required': 'Sales amount is required',
      'number.min': 'Sales amount cannot be negative',
      'number.max': 'Sales amount exceeds maximum allowed value',
      'number.base': 'Sales amount must be a valid number'
    }),
  purchaseAmount: Joi.number()
    .min(0)
    .max(999999999999)
    .precision(2)
    .default(0)
    .messages({
      'number.min': 'Purchase amount cannot be negative',
      'number.max': 'Purchase amount exceeds maximum allowed value',
      'number.base': 'Purchase amount must be a valid number'
    })
}).custom((value, helpers) => {
  const { salesAmount, purchaseAmount } = value;
  
  // Business rule: If both are zero, it's pointless
  if (salesAmount === 0 && purchaseAmount === 0) {
    return helpers.message('Both sales and purchase amounts cannot be zero');
  }
  
  // Warning case: Purchase exceeds sales (results in VAT refund)
  // Not an error, but might be worth noting in response
  
  return value;
}, 'VAT business rules validation');

// POST /vat/calculate
exports.calculateVAT = async (req, res, next) => {
  try {
    // Validate request body
    const { value, error } = vatRequestSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errorMessages = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errorMessages
      });
    }
    
    // Delegate to service layer
    const result = await vatService.calculateVAT(value);
    
    // Add helpful context to response
    const response = {
      success: true,
      data: result
    };
    
    // Add informational note if applicable
    if (value.purchaseAmount > value.salesAmount) {
      response.note = 'Purchase VAT exceeds Sales VAT. You may be eligible for a VAT refund.';
    }
    
    res.status(200).json(response);
    
  } catch (error) {
    // Check if it's a known service error
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message || 'VAT calculation failed'
      });
    }
    
    // Pass unknown errors to error middleware
    next(error);
  }
};

// POST /vat/calculate-reverse - Calculate amount before VAT (bonus endpoint)
exports.calculateReverseVAT = async (req, res, next) => {
  try {
    const reverseVATSchema = Joi.object({
      totalAmount: Joi.number()
        .positive()
        .max(999999999999)
        .precision(2)
        .required()
        .messages({
          'any.required': 'Total amount (including VAT) is required',
          'number.positive': 'Total amount must be positive',
          'number.max': 'Total amount exceeds maximum allowed value'
        })
    });
    
    const { value, error } = reverseVATSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errorMessages = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errorMessages
      });
    }
    
    const result = await vatService.calculateReverseVAT(value);
    
    res.status(200).json({
      success: true,
      data: result
    });
    
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message || 'Reverse VAT calculation failed'
      });
    }
    
    next(error);
  }
};

// GET /vat/rate - Get current VAT rate (bonus endpoint)
exports.getVATRate = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      rate: 7.5,
      description: 'Current VAT rate in Nigeria',
      effectiveDate: '2020-02-01',
      note: 'VAT rate is subject to change by government policy'
    }
  });
};