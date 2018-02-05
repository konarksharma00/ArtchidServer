const _ = require('lodash');
const { User } = require('../db/models/users');

exports.signup = (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'name']);
    var user = new User(body)

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user.tojSON());
    }).catch((e) => {
        res.status(400).send(e)
    })
}

exports.login = (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findUser(body, 'login').then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send('succes');
    }).catch((e) => {
        res.status(400).send(e)
    })
}