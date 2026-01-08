require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const { PORT = 8000, MONGO_URI } = process.env;

let server;

// Connect to MongoDB
mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("✅ Successfully connected to MongoDB");

		server = app.listen(PORT, () => {
			console.log(`🚀 Tax service running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ Error connecting to MongoDB:", err.message);
		process.exit(1);
	});

/**
 * Graceful shutdown handler
 */
const shutdown = async (signal) => {
	console.log(`🛑 ${signal} received. Shutting down gracefully...`);

	// Stop accepting new requests
	if (server) {
		server.close(() => {
			console.log("✅ HTTP server closed");
		});
	}

	try {
		await mongoose.connection.close(false);
		console.log("✅ MongoDB connection closed");
		process.exit(0);
	} catch (err) {
		console.error("❌ Error during shutdown:", err);
		process.exit(1);
	}
};

// Termination signals
process.on("SIGINT", shutdown); // Ctrl + C
process.on("SIGTERM", shutdown); // Docker / PM2
process.on("SIGQUIT", shutdown);

// Crash protection
process.on("unhandledRejection", (reason) => {
	console.error("❌ Unhandled Rejection:", reason);
	shutdown("unhandledRejection");
});

process.on("uncaughtException", (err) => {
	console.error("❌ Uncaught Exception:", err);
	shutdown("uncaughtException");
});
