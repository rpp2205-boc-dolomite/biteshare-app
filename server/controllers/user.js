const db = require('../db/db');

// https://stackoverflow.com/questions/43092071/how-should-i-store-salts-and-passwords-in-mongodb


exports.getUser = function (req, res) {
  const userId = Number(req.query.user_id);
  if (!userId) {
    res.status(400).end();
    return;
  }

  db.User.findOne({ _id: user_id })
    .exec((err, document) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        res.status(200).send(document);
      }
    });
};