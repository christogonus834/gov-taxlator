const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const taxRoutes = require('./src/routers/taxRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/tax', taxRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

module.exports = app;
