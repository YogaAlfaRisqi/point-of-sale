const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// GET /api/v1/users
router.get("/", UserController.getAllUsers);


module.exports = router;
