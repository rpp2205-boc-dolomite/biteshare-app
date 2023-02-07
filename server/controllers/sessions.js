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

var friends = [ ...req.body.friends];

const details = friends.reduce((acc, curr, index) =>
(acc[curr.id] = {
  name: friends[index].name,
  bill: friends[index].meal_amount,
  tip: friends[index].tip_amount,
  is_paid: false
}, acc), {});

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
  .then((sessionId) => {
    console.log('new session', sessionId[0].id);
   // return helper.sendTexts(req.body, sessionId[0].id);
  })
  // .then((message) => {
  //   console.log('sessionId', message.sid);
  //   res.status(200).send(message.sid)
  // })
  .catch((err) => {
    console.log('error', err);
    res.status(500).send(err);
  })
}

exports.updatePaymentStatus = async function(req, res)  {
  const userId = req.body.userId;
  const comment = req.body.comment;
  const data = req.body.data;

  if (!userId) {
    return res.status(500).send('User id not found');
  } else {
    try {
      let updatedSession = await db.Session.findOneAndUpdate(
        {
          _id: data._id,
          [`detail.${userId}`] : { $exists: true }
        },
        { "$set": { [`detail.${userId}.is_paid`] : true }},
        { new: true }
      );
      let entries = Object.entries(updatedSession.detail);
      let paidUsers = entries.filter((x) => x[1].is_paid);
      if (paidUsers.length !== entries.length) {
        return res.status(200).send('Successfully updated payment status for the user');
      } else {
        let textBody = {};
        let hostId = updatedSession.host.valueOf();
        let hostData = await db.User.findById(hostId);
        let hostPhoneNumber = hostData.phone_num;
        let hostName = hostData.name;
        textBody['host_name'] = hostName;
        textBody['restaurant'] = updatedSession.rest_name;
        textBody['sub_total'] = updatedSession.sub_total;
        textBody['tip_total'] = updatedSession.tip_total;
        helper.sendAllFriendHasPaidTexts(textBody);
        res.status(200).send('Successfully updated payment status for the user');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Failed to update status')
    }
  }
}

exports.checkIfUserInFriendsList = function(req, res) {
  const userId = req.query.user_id;
  const sessionId = req.query.session_id;

  db.Session.findById(sessionId)
  .then(result => {
    let friends = result.detail;
    for (const friend in friends) {
      let friendId = friend.valueOf();
      if (friendId === userId) {
        res.status(200).send('allow');
        return;
      }
    }
    res.status(200).send('not friends');
  })
}

exports.getOneSession = function(req, res) {
  const sessionId = req.query.session_id;
  db.Session.findById(sessionId)
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}
