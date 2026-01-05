const mongoose = require('mongoose');

const VatCalculationSchema = new mongoose.Schema(
  {
    salesAmount: {
      type: Number,
      required: true,
      min: 0
    },

    purchaseAmount: {
      type: Number,
      min: 0,
      default: 0
    },

    // Computed fields (returned by vatService)
    outputVAT: {
      type: Number // VAT on sales
    },

    inputVAT: {
      type: Number // VAT on purchases
    },

    vatPayable: {
      type: Number // Net VAT (payable or refundable)
    },

    isRefundable: {
      type: Boolean,
      default: false
    },

    vatRate: {
      type: Number,
      default: 7.5
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('VatCalculation', VatCalculationSchema);
