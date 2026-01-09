const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { calculateTax } = require("../controllers/tax.controller");

// Authenticated route: calculate and save tax record
router.post("/calculate", protect, calculateTax); // only save if logged in

module.exports = router;
