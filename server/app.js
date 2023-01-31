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
const homeController = require('./controllers/home.js');
const { getBiz } = require('./controllers/yelpBiz.js');
const { addReactionToSession, addCommentToSession, testInit } = require('./controllers/social');

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      connectSrc: ["'self'", "https:"], //["https://api.upload.io", "https://upload-prod-files.s3-accelerate.dualstack.amazonaws.com"],
      imgSrc: ["'self'", "data:", "blob:", "https:"]
    }
  }
}));
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
app.put('/api/friends', friendsControllers.deleteFriend);
//---- user info ---//
app.get('/api/users', userControllers.getUser);
app.post('/api/users', userControllers.addUser);

//---sessions ---//
app.get('/api/sessions', sessionControlers.getSessions)
app.post('/api/sessions', sessionControlers.postSessions)

//---- login and signup ----//
app.post('/api/login/', authControllers.verifyLogin)

//---- yelp businesses ---//
app.get('/biz', (req, res) => {
  getBiz(req.query.location, req.query.radius)
    .then ((results) => {
      res.status(200);
      res.send(results.data.businesses);
    })
    .catch ((err) => {
      console.log(err);
    });
});

//---- social ----//
app.post('/api/social/comment/:session_id', addCommentToSession);
app.post('/api/social/reaction/:session_id', addReactionToSession);

//---- user feed ---//
app.get('/api/feed', homeController.getFeed);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


module.exports = app;