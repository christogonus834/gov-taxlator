const mongoose = require('mongoose');

const TaxCalculationSchema = new mongoose.Schema(
  {
    taxType: {
      type: String,
      enum: ['PAYE', 'PIT', 'FREELANCER', 'CIT'],
      required: true,
      index: true
    },

    grossIncome: {
      type: Number,
      required: function () {
        return this.taxType !== 'CIT';
      },
      min: 0
    },

    frequency: {
      type: String,
      enum: ['monthly', 'annual'],
      default: 'annual'
    },

    pension: {
      type: Boolean,
      default: true
    },

    nhf: {
      type: Boolean,
      default: false
    },

    allowances: {
      type: Number,
      min: 0,
      default: 0
    },

    expenses: {
      type: Number,
      min: 0,
      required: function () {
        return this.taxType === 'FREELANCER';
      }
    },

    turnover: {
      type: Number,
      min: 0,
      required: function () {
        return this.taxType === 'CIT';
      }
    },

    profit: {
      type: Number,
      required: function () {
        return this.taxType === 'CIT';
      }
    },

    // computed / result fields (optional but recommended)
    taxableIncome: {
      type: Number
    },

    taxAmount: {
      type: Number
    },

    effectiveTaxRate: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('TaxCalculation', TaxCalculationSchema);
