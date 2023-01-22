
const express = require("express");
const nasaController = require("../controllers/commentApi");
const comment = express.Router();

comment.use(nasaController.checkSession);

comment.post('/submit_comment', nasaController.checkSession, nasaController.postComment);

comment.get('/show_comments/:imageId', nasaController.checkSession, nasaController.getComments);

comment.delete('/delete_comment/:imageId/:commentId', nasaController.checkSession, nasaController.deleteComment);

module.exports = comment;


