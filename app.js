const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const taxRoutes = require("./src/routers/tax.routes");
const vatRoutes = require("./src/routers/vat.routes");

const app = express();

// Environment-based CORS
const allowedOrigins =
	process.env.NODE_ENV === "production"
		? ["https://myfrontend.com"] // production frontend URL
		: ["http://localhost:8000"]; // local frontend for testing

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);

// Middlewares
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/tax", taxRoutes);
app.use("/api/vat", vatRoutes);

// Health check endpoint
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		success: false,
		message: err.message || "Internal Server Error",
	});
});

module.exports = app;
