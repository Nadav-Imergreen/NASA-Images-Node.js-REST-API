const express = require('express');
const registerController = require('../controllers/regiisterScreen.js');
const loginController = require('../controllers/LoginScreen.js');
const passwordController = require('../controllers/passwordScreen.js');

const router = express.Router();

router.get('/', loginController.getLoginPage);

router.get('/register', registerController.getRegisterPage);

router.get('/register-password', passwordController.getPasswordPage);

module.exports = router;