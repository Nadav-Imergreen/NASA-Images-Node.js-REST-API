const express = require('express');
const registerController = require('../Controllers/regiisterScreen.js');
const passwordController = require('../Controllers/passwordScreen.js');
const router = express.Router();

router.post('/register', registerController.postRegisterPage);

//router.post('/', loginController.getLoginPage);
router.post('/register-password', passwordController.postPasswordPage);

module.exports = router;
