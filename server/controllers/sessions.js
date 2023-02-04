const db = require('../db/db');
const user = require('./user');
const helper = require('./helpers');

exports.getSessions = function(req, res) {
  const userId = req.query.user_id;
  if (!userId) {
    res.status(400).send('No user id found');
    return;
  }

  db.Session.find(
    { $and: [ { [`detail.${userId}`] : { $exists : true } }, { [`detail.${userId}.is_paid`] : { $eq: false } } ] },
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

console.log(req.body);

var friends = [ ...req.body.friends];

const details = friends.reduce((acc, curr, index) =>
(acc[curr.id] = {
  name: friends[index].name,
  bill: friends[index].meal_amount,
  tip: friends[index].tip_amount,
  is_paid: false
}, acc), {});

console.log(req.body.host.user_id)
details[req.body.host.user_id] = {
  name: req.body.host.name,
  bill: req.body.host.meal_amount,
  tip: req.body.host.tip_amount,
  is_paid: false
}

   db.Session.insertMany({
    host: req.body.host.user_id,
    detail: details,
    rest_name: req.body.rest_name,
    sub_total: req.body.sub_total,
    tip_total: req.body.tip_total,
    receipt: req.body.receipt,
    active: true
  })
  // .then(sessionId => {
  //   res.status(200).send('Session created!')
  // })
    .then
  // .then((sessionId) => {
  //   console.log('sessionId', sessionId);
  //   return helper.sendTexts(req.body)
  // })
  // .then((message) => {
  //   res.status(200).send(message);
  // })
  .catch((err) => {
    res.status(500).send(err);
  })
}

exports.updatePaymentStatus = function(req, res)  {
  const userId = req.body.userId;
  const comment = req.body.comment;

  if (!userId) {
    res.status(500).send('User id not found');
  } else {
    let textBody = {};

    db.Session.findOneAndUpdate({[`detail.${userId}`] : { $exists : true }}, {$set:{[`detail.${userId}.is_paid`]: true}})
    .then(data => {
      return db.Session.findById(sessionId)
    })
    .then(data => {
      for (const friend in data.detail) {
        if (!data.detail[friend].is_paid) {
          res.status(200).send('Successfully updated payment status for the user');
          return;
        }
      }
      // all participants have paid
      textBody['restaurant'] = data.rest_name;
      textBody['sub_total'] = data.sub_total;
      textBody['tip_total'] = data.tip_total;

      const hostId = data.host.valueOf();
      return db.User.findById(hostId)
    })
    .then(data => {
      let hostPhoneNumber = data.phone_num;
      let hostName = data.name;
      textBody['host_name'] = hostName;
      textBody['host_phone_number'] = hostPhoneNumber;
      helper.sendAllFriendHasPaidTexts(textBody);
      res.status(200).send('Successfully updated payment status for the user');
    })
    .catch((err) => {
      res.status(500).send('Failed to update payment status for the user');
    })
  }
}
