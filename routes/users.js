const express = require('express');
const registerController = require('../Controllers/regiisterScreen.js');
const loginController = require('../Controllers/LoginScreen.js');
const passwordController = require('../Controllers/passwordScreen.js');

const router = express.Router();

router.get('/', loginController.getLoginPage);

router.get('/register', registerController.getRegisterPage);

router.get('/register-password', passwordController.getPasswordPage);

module.exports = router;