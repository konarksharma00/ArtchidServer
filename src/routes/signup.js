// const _ = require('lodash');
// var express = require('express');

// const { User } = require('./db/models/users');

// var router = express.Router();
// /* GET users listing. */
// router.get('/signup', (req, res, next)=>{
//   var body = _.pick(req.body,['email', 'password','name']);    
//   var user = new User(body)

//   user.save().then(()=>{
//       return user.generateAuthToken();
//   }).then((token)=>{
//       res.header('x-auth', token).send(user.tojSON());
//   }).catch((e)=>{
//       res.status(400).send(e)
//   })
// });

// module.exports = router;
