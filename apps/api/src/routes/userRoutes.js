const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// GET /api/v1/users
router.get("/", UserController.getAllUsers);
router.get("/addUsers", UserController.addUsers);
router.get("/updateUsers/", UserController.updateUsers);
router.get("/deleteUsers/", UserController.deleteUsers);


module.exports = router;
