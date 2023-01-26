const db = require('../db/db');

exports.getFriends = function (req, res) {
  const userId = req.query.user_id;
  if (!userId) {
    res.status(400).end();
    return;
  }

  db.User.findOne({ _id: userId }, { friends: 1 })
    .populate('friends')
    .exec((err, doc) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        res.status(200).send(doc);
      }
    });
}

exports.addFriends = function (req, res) {
  // takes a user_id or array of user_id's
  // returns an array of the results
  const userId = req.query.user_id;
  let friends = req.body.friends;
  if(!userId || !friends) {
    res.status(400).end();
    return
  }
  if (typeof friends === 'string') {
    friends = [friends];
  }

  db.User.updateOne({_id: userId}, { $addToSet: { "friends": { $each: friends } } })
    .then(result => {
      res.status(201).send(result.acknowledged);
    })
    .catch(err => console.error(err));
}