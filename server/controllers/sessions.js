const db = require('../db/db');

exports.getSessions = function(req, res) {
  const userId = req.query.user_id;
  if (userId) {
    res.status(400).send('No user id found');
    return;
  }

  db.Session.find({ _id: userId })
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    console.log('error', err);
    res.status(500).send(`Failed to get sessions for ${userId}`);
  })
}

exports.postSessions = function(req, res) => {
  const userId = req.query.user_id;
  if(!)
}