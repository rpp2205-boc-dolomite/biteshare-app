const db = require('../db/db');
const ObjectId = db.ObjectId;

exports.getFeed = (req, res) => {
  var promises = [];
  var userId = req.query.user_id;

  db.User.aggregate([
    {
      $match:  { _id: ObjectId(userId)}
    },
    {
      $lookup: {
        from: "sessions",
        localField: "friends",
        foreignField: "host",
        as: "friendSessions"
      }
    },
    {
      $project: { friendSessions: 1}
    }
  ])
  .then((results) => {
    res.status(200).send(results)
  })
  .catch((err) => {
    res.status(500).send(err);
  })
};