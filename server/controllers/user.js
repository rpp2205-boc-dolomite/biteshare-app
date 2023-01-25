const db = require('../db/db');

// https://stackoverflow.com/questions/43092071/how-should-i-store-salts-and-passwords-in-mongodb


exports.getUser = function (req, res) {

  const userId = req.query.user_id;
  console.log(typeof req.query.user_id, userId);
  if (!userId) {
    db.User.find({})
    .exec((err, document) => {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.status(200).send(document);
    }
  });
    // res.status(400).end();
    // return;
  } else {
    db.User.findOne({ _id: userId })
    .exec((err, document) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        res.status(200).send(document);
      }
    });
  }



};

exports.addUser = (req, res) => {
  console.log('new user', req.body)
  let newUser = new db.User(req.body);
  newUser.save()
    .then((result)=>{
      console.log('res',result);
      res.status(201).send(result.id);
    })
    .catch(err => console.error(err))
}

