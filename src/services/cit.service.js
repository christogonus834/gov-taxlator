// const { CIT_TAX_RATE } = require("../utils/taxBands");

const { CIT_RATES } = require("../utils/tax/cit.util");

/**
 * Calculate Company Income Tax (CIT)
 */
exports.calculateCIT = async ({ profit, companySize }) => {
	const rate = CIT_RATES[companySize];

	if (rate === undefined) {
		throw new Error("Invalid company size");
	}

	const taxPayable = profit * rate;

	return {
		taxType: "CIT",
		companySize,
		profit,
		taxRate: rate,
		taxPayable,
	};
};
