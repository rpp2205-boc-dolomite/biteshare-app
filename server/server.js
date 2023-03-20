require('dotenv').config();

const fs = require('fs');
const path = require('path');
const spdy = require('spdy');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const useSSL = process.env.USE_SSL === 'true' ? true : false;

const createServer = () => {
  if (!useSSL) {
    return app;

  } else {
    const CERT_DIR = path.resolve(__dirname, 'https');
    const options = {
      key: fs.readFileSync(path.join(CERT_DIR, process.env.SSL_KEY_FILE)),
      cert: fs.readFileSync(path.join(CERT_DIR, process.env.SSL_CERT_FILE))
    };

    return spdy.createServer(options, app);
  }
};

const server = createServer();

server.listen(PORT, () => {
  console.log(`BOC server listening on port ${PORT}`);
  console.log(`HTTP/2 & SSL: ${useSSL ? 'enabled' : 'disabled'}`);
});