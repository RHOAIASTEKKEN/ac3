const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.get('/register', registerController.showForm); // Método GET para mostrar el formulario
router.post('/register', registerController.registerUser); // Método POST para procesar el registro

module.exports = router;
