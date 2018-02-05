const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const { User } = require('./db/models/users');
const { mongoose } = require('./db/mongoose');
const { authenticate } = require('./middleware/authenticate')
// const router = require('./routes');
// const router = require('./users');
// const router = require('./login');

var app = express();

var port = process.env.PORT || '7777';

app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json());
app.use('/api', routes)

app.listen(port, ()=>{
    console.log('artchid server connection active')
})

module.exports = { app }