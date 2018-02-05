const _ = require('lodash');

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:7,
        validate:{
            validator: validator.isEmail,
            message:'{value} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    lastName:{
        type:String,
        trim:true,
        minlength:2
    },
    gender:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:String,
        trim:true
    },
    dob:{
        type:String,
        trim:true,
    },
    tokens:[{
        access:{
            type:String,
            required:true
            
        },
        token:{
            type:String,
            required:true,
            unique:true
            
        }
    }]
},);

UserSchema.methods.tojSON = function(){
    var user = this
    var userObject = user.toObject();

    return _.pick(userObject,['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(), access},'abc123').toString()

    user.tokens.splice(0,1,{access,token});

    return user.save().then(()=>{
        return token
    })
}

UserSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt,(err, hash)=>{
                user.password = hash;
                next();
            })
        })
    } else{ 
        next();
    }
});

UserSchema.statics.findUser = function(data,type){
    var User = this;
    var decoded;

    switch(type){
        case'login':
            return User.findOne({
                'email':data.email,
            }).then((user)=>{
                if(!user){
                    return Promise.reject('Authentication failed!, please check your "email" agian.');
                }
                return new Promise((resolve, reject)=>{
                    bcrypt.compare(data.password,user.password, (err, res)=>{
                            if(res){
                                resolve(user);
                            } else{
                                reject('Authentication failed!, please check your "password" agian.');
                            }
                        })
                    })
                }
            );
        break;

        default:
        try{
            decoded = jwt.verify(data, 'abc123');
        } catch(e){
            return Promise.reject('something went wrong')
        }

        return User.findOne({
            '_id':decoded._id,
            'tokens.token':data,
            'tokens.access':'auth'
        });
    }
}

var User = mongoose.model('User', UserSchema)

module.exports= { User }