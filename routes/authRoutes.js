const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);
router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);

module.exports = router;
