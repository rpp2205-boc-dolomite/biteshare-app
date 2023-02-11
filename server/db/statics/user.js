const db = require('../db/db.js');
const jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

exports.createToken = function () {

}

exports.verifyToken = function (token) {
  let data, decoded;
  try {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      data = JSON.parse(new Buffer(base64, 'base64').toString('ascii'));
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(err.toString());
  }

  return db.User.getSecret(data.user_id)
    .then(secret => {
      try {
        decoded = jwt.verify(token, secret);
      } catch(err) {
        return false;
      }
      return decoded;
    });
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