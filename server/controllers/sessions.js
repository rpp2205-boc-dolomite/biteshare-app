const db = require('../db/db');
const user = require('./user');

exports.getSessions = function(req, res) {
  const userId = req.query.user_id;
  console.log('userId in session: ', userId);
  console.log('userId length: ', userId.length);
  if (!userId) {
    res.status(400).send('No user id found');
    return;
  }

  db.Session.find(
    { [`detail.${userId}`] : { $exists : true } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
}

exports.postSessions = function(req, res) {
  //in req.body is the info
  // user addUser controller to add new users
  // returns an insertedIds array which I will use to be the keys
    // for details field
  //

  //var comment = {[user_id]: {comment: 'I wanna go here', date: timestamp}}

var session = {host: '63d5690765b903d98477c097', detail: {'63d5690765b903d98477c097': {name: 'stacey', tip: 2.42, bill: 12.32, is_paid: false}, '63d57d8704421e1d60c0dbbe': { name: "heather", tip: 1.75, bill: 10.21, is_paid: false}, '63d56921fb74d33c0a908e2b': {name: "Yui", tip: 1.75, bill: 10.21, is_paid: false}}, rest_name : 'Blue Sky', sub_total: 28.21, tip_total: 2.11, receipt: 'www.google.com'}
// db.User.updateOne({_id: 63d57d8704421e1d60c0dbbe}, { $addToSet: { "friends": ObjectId(63d5690765b903d98477c097)} })
var session = {host: '63d56a0483bd4d48f67c9981', detail: {'63d56a0483bd4d48f67c9981': {name: 'yuchen', tip: 1.47, bill: 21.41, is_paid: false}, '63d56921fb74d33c0a908e2b': {name: "Yui", tip: 1.75, bill: 10.21, is_paid: false}, '63d5690765b903d98477c097': {name: 'stacey', tip: 2.42, bill: 12.32, is_paid: false}}, rest_name : 'Red Sky', sub_total: 28.21, tip_total: 2.11, receipt: 'www.google.com'}
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

exports.updatePaymentStatus = function(req, res)  {
  // what if same user has created multiple sessions

  // [
  //   {
  //     id: 'randomly generated number',
  //     detail: {
  //       [user_id]: {
  //          name: "Jack Dorsey",
  //          tip: 1.75,
  //          bill: 10.21,
  //          is_paid: true
  //       },
  //       [user_id]: {
  //          name: "Bugs Bunny",
  //          tip: 1.75,
  //          bill: 10.21,
  //          is_paid: false
  //       }
  //    },
  //    rest_name: 'Mos burger',
  //    sub_total: 20.00,
  //    tip_total: 16.00,
  //    receipt: 'receipt.com',
  //    active: false
  //   }
  // ]

  const hostId = req.body.session_id; // currently selected meal session
  const userId = req.body.user_id; // currently selected user

  if (!hostId || !userId) {
    res.status(500).send('No user id or session id specified');
    return;
  }



}