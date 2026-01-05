const express = require('express');
const router = express.Router();

const { calculateTax } = require('../controllers/tax.controller');

/**
 * POST /api/tax/calculate
 */
router.post('/calculate', calculateTax);

module.exports = router;
