const express = require('express');
const registerController = require('../controllers/regiisterScreen.js');
const passwordController = require('../controllers/passwordScreen.js');
const loginController = require('../controllers/loginScreen.js');
const nasaController = require('../controllers/commentApi');
const router = express.Router();

router.post('/', loginController.postLoginPage);

router.post('/register', registerController.postRegisterPage);

router.post('/register-password', passwordController.postPasswordPage);

router.post('/submit_comment', nasaController.postComment);

router.get('/auto/show_comments/:imageId', nasaController.autoGetComments);

router.get('/show_comments/:imageId', nasaController.getComments);

router.delete('/show_comments/:imageId/:commentId', nasaController.deleteComment);

module.exports = router;


