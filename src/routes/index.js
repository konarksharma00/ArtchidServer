var express = require('express');
var router = express.Router();

// Defining Routes
const user = require('./userRoute');
const connTest = require('./connectionTest');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/connTest', connTest)
router.use('/user', user);


module.exports = router;
