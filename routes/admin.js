const express = require('express');
const registerController = require('../controllers/regiisterScreen.js');
const passwordController = require('../controllers/passwordScreen.js');
const loginController = require('../controllers/loginScreen.js');
const router = express.Router();

router.post('/', loginController.postLoginPage);

router.post('/register', registerController.postRegisterPage);

router.post('/register-password', passwordController.postPasswordPage);

module.exports = router;


