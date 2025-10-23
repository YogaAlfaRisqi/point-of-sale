const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require(`cookie-parser`);
const apiRouter = require('./routes');
const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes with prefix
app.use('/api/v1', apiRouter);

// Health check at root
app.get('/', (req, res) => {
  res.json({
    name: "POS API",
    version: "1.0.0",
    status: "running",
    docs: "/api/v1/"
  });
});


module.exports = app;
