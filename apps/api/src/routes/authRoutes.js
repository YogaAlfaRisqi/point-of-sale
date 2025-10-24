const authRoutes = require('express').Router();
const AuthController = require('../controllers/AuthController');
const { loginSchema, registerSchema } = require('../middleware/authValidator');
const validate = require('../middleware/validate');
const { verifyAccessToken } = require('../utils/jwt');


// POST /api/v1/auth/register
authRoutes.get('/', (req, res) => {
    res.send('Auth route is working');
});
authRoutes.post('/register',validate(registerSchema), AuthController.register);
authRoutes.post('/login',validate(loginSchema), AuthController.login)
authRoutes.post('/logout',verifyAccessToken,AuthController.logout)


module.exports = authRoutes;