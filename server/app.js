const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

const helmet = require('helmet');
const cors = require('cors');

const userControllers = require('./controllers/user'); // This line will be changed. It is here to trigger the DB to load.

if (process.env.NODE_ENV === 'development') {
  // require morgan if in development mode
  // setting morgan to dev: https://www.npmjs.com/package/morgan#dev
  app.use(require('morgan')('dev'));
}
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, '../client/dist')));

module.exports = app;