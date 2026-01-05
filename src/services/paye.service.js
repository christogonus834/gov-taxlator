// src/services/paye.service.js

const { PAYE_TAX_BANDS } = require('../utils/taxBands');

/**
 * Calculate PAYE Tax
 */
const calculatePAYE = async ({
  grossIncome,
  frequency = 'annual'
}) => {
  // 1. Normalize income to annual
  const annualIncome =
    frequency === 'monthly' ? grossIncome * 12 : grossIncome;

  let remainingIncome = annualIncome;
  let totalTax = 0;
  const breakdown = [];

  // 2. Apply tax bands progressively
  for (const band of PAYE_TAX_BANDS) {
    if (remainingIncome <= 0) break;

    const taxableAmount = Math.min(remainingIncome, band.limit);
    const taxForBand = taxableAmount * band.rate;

    breakdown.push({
      bandLimit: band.limit,
      rate: band.rate,
      taxableAmount,
      tax: taxForBand
    });

    totalTax += taxForBand;
    remainingIncome -= taxableAmount;
  }

  // 3. Monthly tax (if needed)
  const monthlyTax = totalTax / 12;

  return {
    grossIncome,
    frequency,
    annualIncome,
    totalAnnualTax: Number(totalTax.toFixed(2)),
    monthlyTax: Number(monthlyTax.toFixed(2)),
    breakdown
  };
};

module.exports = {
  calculatePAYE
};
