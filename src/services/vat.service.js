// src/services/vat.service.js

const { VAT_RATE } = require('../utils/taxBands');

/**
 * Calculate VAT
 * @param {Object} data
 * @param {number} data.amount - Amount subject to VAT
 */
const calculateVAT = async ({ amount }) => {
  if (amount <= 0) {
    const error = new Error('Amount must be greater than zero');
    error.statusCode = 400;
    throw error;
  }

  const vatAmount = amount * VAT_RATE;
  const totalWithVAT = amount + vatAmount;

  return {
    taxableAmount: amount,
    vatRate: VAT_RATE,
    vatAmount: Number(vatAmount.toFixed(2)),
    totalAmount: Number(totalWithVAT.toFixed(2))
  };
};

module.exports = {
  calculateVAT
};
