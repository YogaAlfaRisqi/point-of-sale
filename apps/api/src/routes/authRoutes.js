const authRoutes = require('express').Router();
const AuthController = require('../controllers/AuthController');

// POST /api/v1/auth/register
authRoutes.post('/register', AuthController.register);
authRoutes.post('/login',AuthController.login)


module.exports = authRoutes;