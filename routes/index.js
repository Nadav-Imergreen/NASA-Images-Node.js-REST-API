var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , imglogo: '/images/0.JPG'});
});

module.exports = router;
