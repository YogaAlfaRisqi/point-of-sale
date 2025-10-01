const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const apiRouter = require('./routes');
const app = express();
const config = require('../config/config');


// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes with prefix
app.use('/api/v1', apiRouter);

// Health check at root
app.get('/', (req, res) => {
  res.json({
    name: "POS API",
    version: "1.0.0",
    status: "running",
    docs: "/api/v1/",
    envirenment: config.app.env
  });
});

// Graceful shutdown (supaya prisma connection bersih saat server mati)
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;
