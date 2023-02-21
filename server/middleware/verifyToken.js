require('dotenv').config();
// const db = require('../db/db.js');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const [authType, token] = req.header('Authorization').split(' ');
    req.tokenData = jwt.verify(token, process.env.JWT_AUTH_SECRET_KEY);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}