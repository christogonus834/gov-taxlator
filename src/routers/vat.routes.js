const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { calculateVAT } = require("../controllers/vat.controller");

// Authenticated route: calculate and save VAT record
router.post("/calculate", protect, calculateVAT); // only save if logged in

module.exports = router;
