const axios = require('axios');
require("dotenv").config();

let getBiz = (local) => {
  let options = {
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?location=${local}&radius=3215&sort_by=distance&limit=20`,
    headers: {
      'User-Agent': 'request',
      'Content-Type': 'application / json',
      'Authorization': `Bearer ${process.env.YELP_TOKEN}`
    }
  };
  return axios(options);
}

module.exports = { getBiz };