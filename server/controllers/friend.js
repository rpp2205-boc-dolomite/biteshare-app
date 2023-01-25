const db = require('../db/db');

exports.getFriends = function (req, res) {
  const userId = req.query.user_id;
  if (!userId) {
    res.status(400).end();
    return;
  }

  db.User.findOne({ _id: userId }, { _id: 'user_id', friends: 1 })
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
  console.log('post friends: ', req.query.user_id)
  const userId = req.query.user_id
  const guestId = req.body.guest_id
  if(!userId) {
    res.status(400).end();
    return
  }
  db.User.updateOne({_id: userId}, {$push:{"friends": guestId}})
    .then(result => {
      res.status(201).send(result.acknowledged);
    })
    .catch(err => console.error(err));
}