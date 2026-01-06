const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const taxRoutes = require("./src/routers/tax.routes");
const vatRoutes = require("./src/routers/vat.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/tax", taxRoutes);
app.use("/api/vat", vatRoutes);

module.exports = app;
