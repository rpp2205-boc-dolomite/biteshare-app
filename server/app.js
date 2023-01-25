const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

const helmet = require('helmet');
const cors = require('cors');

const { getUser, addUser, updateUser } = require('./controllers/user');
const { getFriends } = require('./controllers/friend');

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


app.get('/api/users/:user_id', getUser);
app.post('/api/users', addUser);
app.put('/api/users/:user_id', updateUser);

app.get('/api/friends/:user_id', getFriends);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = app;