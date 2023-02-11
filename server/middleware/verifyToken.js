require('dotenv').config();
// const db = require('../db/db.js');
const jwt = require('jsonwebtoken');

exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  try {
    req.tokenData = jwt.verify(token, process.env.JWT_AUTH_SECRET_KEY);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}