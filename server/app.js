const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

const helmet = require('helmet');
const cors = require('cors');

const userControllers = require('./controllers/user'); // This line will be changed. It is here to trigger the DB to load.
const friendsControllers = require('./controllers/friend');
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  // require morgan if in development mode
  // setting morgan to dev: https://www.npmjs.com/package/morgan#dev
  app.use(require('morgan')('dev'));
}
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(compression());
app.use((req, res, next) => {
  if (req.url === '/bundle.js') {
    res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
  }
  next();
});
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//--- get user's friends list ---//
app.get('/friends', friendsControllers.getFriends)
app.post('/friends', friendsControllers.addFriends)
app.get('/users', userControllers.getUser)
app.post('/users', userControllers.addUser)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


module.exports = app;