const express = require("express");
const router = express.Router();

const { calculateVat } = require("../controllers/vat.controller");

/**
 * POST /api/vat/calculate
 */
router.post("/calculate", calculateVat);

module.exports = router;
