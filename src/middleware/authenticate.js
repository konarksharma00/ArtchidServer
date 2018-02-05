var { User } = require('./../db/models/users');

var authenticate = (req, res, next)=>{
    var token = req.header('x-auth');
    User.findUser(token).then((user)=>{
        if(!user){
            return Promise.reject()
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    })
}

module.exports = { authenticate }