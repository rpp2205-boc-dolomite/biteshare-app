const axios = require('axios');
require("dotenv").config();

let getBiz = (local, radius) => {
  let getBizzy = axios.get(`https://api.yelp.com/v3/businesses/search?location=${local}&radius=${radius}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_TOKEN}`
    },
    params: {
      sort_by: 'distance',
      limit: '20'
    }
  })
  return getBizzy;
}

module.exports = { getBiz };