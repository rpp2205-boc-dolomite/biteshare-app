const db = require('../db/db');

// https://stackoverflow.com/questions/43092071/how-should-i-store-salts-and-passwords-in-mongodb


exports.getUser = function (req, res) {
  const userId = req.params.user_id;
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

exports.addUser = function (req, res) {
  const docs = req.body;
  if (!docs || !(docs instanceof Object)) {
    res.status(400).end();
    return;
  }

  db.User.create(docs)
    .then(reply => {
      res.status(200).send(reply);
    })
    .catch(err => {
      res.status(500).send(err.toString());
    });
}

exports.updateUser = function (req, res) {
  const userId = req.params.user_id;
  const update = req.body;
  if (!userId || !update || !(update instanceof Object)) {
    res.status(400).end();
    return;
  }

  db.User.findById(userId)
    .then(doc => {
      Object.assign(doc, update);
      return doc.save();
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      res.status(500).send(err.toString());
    });
}