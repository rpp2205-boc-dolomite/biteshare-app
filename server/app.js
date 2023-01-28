const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

const helmet = require('helmet');
const cors = require('cors');


const userControllers = require('./controllers/user'); // This line will be changed. It is here to trigger the DB to load.
const friendsControllers = require('./controllers/friend');
const sessionControlers = require('./controllers/sessions');
const authControllers = require('./controllers/auth.js');
const { getBiz } = require('./controllers/yelpBiz.js');

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


//---  user's friends list ---//
app.get('/api/friends', friendsControllers.getFriends);
app.post('/api/friends', friendsControllers.addFriend);

//---- user info ---//
app.get('/api/users', userControllers.getUser);
app.post('/api/users', userControllers.addUser);

//---sessions ---//
app.post('/api/sessions', sessionControlers.postSessions)

//---- login and signup ----//
app.post('/api/login/', authControllers.verifyLogin)

//---- yelp businesses ---//
app.get('/biz', (req, res) => {
  getBiz(req.query.location)
    .then ((results) => {
      res.status(200);
      res.send(results.data.businesses);
    })
    .catch ((err) => {
      console.log(err);
    });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


module.exports = app;