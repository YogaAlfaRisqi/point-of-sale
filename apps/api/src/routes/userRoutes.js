const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// GET /api/v1/users
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
