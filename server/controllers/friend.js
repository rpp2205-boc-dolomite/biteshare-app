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

exports.addFriend = function (req, res) {
  const userId = req.query.user_id;
  let friends = req.body.guest_id;
  console.log('add friends',userId, friends);
  if(!userId || !friends) {
    res.status(400).end();
    return
  }
  db.User.updateOne({_id: userId}, { $addToSet: { "friends": friends} })
    .then(result => {
      res.status(201).send(result.acknowledged);
    })
    .catch(err => console.error(err));
}

exports.deleteFriend = function (req, res) {
  const userId = req.body.user_id;
  const friendId = req.body.friend.id;
  console.log('user in delete', userId, friendId);
  db.User.updateOne({_id: userId},{$pull: {'friends': friendId}})
    .then(result => {
      console.log(result);
      res.status(203).send(result)
    })
    .catch(err=>res.status(404).send(err));
}