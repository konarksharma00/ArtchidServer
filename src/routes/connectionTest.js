const _ = require('lodash');
var express = require('express');

var router = express.Router();
/* GET users listing. */
router.get('/', (req,res)=>{
    console.log('request made')
  res.status(200).send('I am alive')
});

module.exports = router;
