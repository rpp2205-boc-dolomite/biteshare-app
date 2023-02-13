const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const authControllers = require('./controllers/auth.js');
const privateApiRoutes = require('./routers/privateApiRoutes');

app.use(helmet({
  crossOriginEmbedderPolicy: false,
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//---- Root path '/' ----//
app.use(express.static(path.join(__dirname, '../client/dist')));
//---- login and signup ----//
app.post('/api/login/', authControllers.verifyLogin)

//---- private API routes ----//
app.use('/api', privateApiRoutes);

//---- wildcard route for React ----//
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


module.exports = app;