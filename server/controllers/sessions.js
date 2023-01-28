const db = require('../db/db');
const user = require('./user');

exports.getSessions = function(req, res) {
  const userId = req.query.user_id;
  console.log(userId);
  if (!userId) {
    res.status(400).send('No user id found');
    return;
  }

  db.Session.find({ host: '63d4a4a13ca796188c5bd365' })
  .then(result => {
    console.log(result);
    res.status(200).send(result);
  })
  .catch(err => {
    console.log('error', err);
    res.status(500).send(`Failed to get sessions for ${userId}`);
  })
}

exports.postSessions = function(req, res) {
  //in req.body is the info
  // user addUser controller to add new users
  // returns an insertedIds array which I will use to be the keys
    // for details field
  //

var session = {host: '63d4a4a13ca796188c5bd365', detail: {'63d4aa954a874db26a5436c7': { name: "yuchen", tip: 1.75, bill: 10.21, is_paid: true}, '63d4b13b1d6b6ecc80c04dd5': {name: "Yui", tip: 1.75, bill: 10.21, is_paid: false}}, rest_name : 'Blue Sky', sub_total: 28.21, tip_total: 2.11, receipt: 'www.google.com'}

//var participants = [{
//    name: 'Jack Dorsey',
//    tip: 1.75,
//    bill: 24.2
//  },
//  {
//   name: "Bugs Bunny",
//   tip: 1.75,
//   bill: 10.21,
//  }
// ]

// var info = {
//   host: userId (this will be in a state variable, set after sign In)
//   rest_name: 'Chilis',
//   sub_total: 32.45,
//   tip: 34.5,
//   receipt: 'www.google.com'
// }

//expecting body to be {users, info} where users is an array of objects and
// info has the rest_name and other info

  db.User.insertMany(req.body.users)
    .then((results) => {
      const details = results.reduce((acc, curr, index) =>
        (acc[curr] = {
          name: req.body[index].name,
          tip: req.body[index].tip,
          is_paid: true
        }, acc), {});

        return db.Session.insert({
        detail: details,
        ...req.body.info
      });
    })
    .then((newResults) => {
      res.status(200).send(newResults);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}