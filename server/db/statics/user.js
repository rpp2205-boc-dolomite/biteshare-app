require('dotenv').config();
// const db = require('../db/db.js');
const jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

exports.createToken = function (payload) {
  return jwt.sign(payload, process.env.JWT_AUTH_SECRET_KEY, { expiresIn: '24h' });
}

exports.verifyToken = function (token) {
  return jwt.verify(token, process.env.JWT_AUTH_SECRET_KEY);
}

exports.getSecret = function (user_id) {
  return db.User.findOneById(user_id, { secret: 1 })
    .then(data => {
      console.log('SECRET', data);
    })
    .catch(err => {
      console.log(err);
    });
}

var a = '8afc5be5a0307d9af2dac4d6b15d905e63946cbe344e5b1d37bbe173495adfdf513f29f8a2627a4d15e7f2951773f70f58d0486a2c97062264c1639e3e82c388';
var b = exports.createToken({ hello: 'world' });
var c = exports.verifyToken(b);

console.log(b);
console.log(c);