const express = require('express');
const registerController = require('../controllers/regiisterScreen.js');
const loginController = require('../controllers/LoginScreen.js');
const passwordController = require('../controllers/passwordScreen.js');
const nasaController = require('../controllers/nasaScreen');
const router = express.Router();

router.get('/', loginController.getLoginPage);

router.get('/register', registerController.getRegisterPage);

router.get('/register-password', passwordController.getPasswordPage);

router.get('/nasa/photos', nasaController.getNasaPage);

router.get('/sign_out', nasaController.leaveNasaPage);

module.exports = router;