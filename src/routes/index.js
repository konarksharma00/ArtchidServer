var express = require('express');
var router = express.Router();

// Defining Routes
const user = require('./userRoute');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', user);


module.exports = router;
