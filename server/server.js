require('dotenv').config();

const port = process.env.PORT || 3000;
const app = require('./app');

app.listen(port, function () {
  console.log(`BOC server running on port ${port}...`);
});