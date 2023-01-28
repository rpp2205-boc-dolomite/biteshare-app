const axios = require('axios');
require("dotenv").config();

let getBiz = (local) => {
  let getBizzy = axios.get(`https://api.yelp.com/v3/businesses/search?location=${local}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_TOKEN}`
    },
    params: {
      radius: '3215',
      sort_by: 'distance',
      limit: '20'
    }
  })
  return getBizzy;
}

module.exports = { getBiz };