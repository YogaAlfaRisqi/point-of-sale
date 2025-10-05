const authRoutes = require('express').Router();
const AuthController = require('../controllers/AuthController');

// POST /api/v1/auth/register
authRoutes.get('/', (req, res) => {
    res.send('Auth route is working');
});
authRoutes.post('/register', AuthController.register);
authRoutes.post('/login',AuthController.login)


module.exports = authRoutes;