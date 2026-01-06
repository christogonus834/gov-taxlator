require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app"); // Import the configured app

const { PORT = 8000, MONGO_URI } = process.env;

// Connect to MongoDB
mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("✅ Successfully connected to MongoDB");

		// Start server only after DB connection
		app.listen(PORT, () => {
			console.log(`🚀 Tax service running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ Error connecting to MongoDB:", err.message);
		process.exit(1);
	});

// Graceful shutdown (CTRL + C, Docker stop, etc.)
process.on("SIGINT", async () => {
	console.log("🛑 Shutting down gracefully...");
	try {
		await mongoose.connection.close();
		console.log("✅ MongoDB connection closed");
		process.exit(0);
	} catch (err) {
		console.error("❌ Error during shutdown:", err);
		process.exit(1);
	}
});
