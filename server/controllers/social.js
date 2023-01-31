const db = require('../db/db');

exports.addReactionToSession = function (req, res) {
  const session_id = req.query.session_id;
  const { user_id, emoji } = req.body;

  if (!session_id || !user_id || !emoji) {
    res.status(400).end();
    return;
  }

  const update = {};
  update[enoji] = { $addToSet: user_id };

  db.Session.findOneAndUpdate({_id: session_id}, update)
    .then(result => {
      if (result.acknowledged) {
        res.status(201).end();
      }
    })
    .catch(err => {
      res.status(500).send(err.toString());
    });
};

exports.addCommentToSession = function (req, res) {
  const session_id = req.query.session_id;
  const { user_id, text } = req.body;

  if (!session_id || !user_id || !text) {
    res.status(400).end();
    return;
  }


};