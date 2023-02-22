const db = require('../db/db');
// https://stackoverflow.com/questions/43092071/how-should-i-store-salts-and-passwords-in-mongodb
const auth = require('./auth.js')
const parsePhoneNumber = require('libphonenumber-js');

const parsePhoneNumbers = function (docs) {
  const parseDoc = (doc) => {
    const phone = parsePhoneNumber(doc.phone_num, 'US');

    if (phone) {
      doc.phone_num = phone.number;
    }
  };

  if (Array.isArray(docs)) {
    for (const doc of docs) {
      parseDoc(doc);
    }
  } else {
    parseDoc(docs);
  }
};

exports.getUser = function (req, res) {
  // FYI: had an issue with the plus sign in the phone number. Might need to escape it before sending.
  // https://www.werockyourweb.com/url-escape-characters/#:~:text=%2B-,%252B,-%2C
  const userId = req.query.user_id;
  const parsed = req.query.phone_num && parsePhoneNumber(req.query.phone_num, 'US');
  const phoneNum = parsed && parsed.number;
  console.log('in getUser', userId, phoneNum);
  if (!userId && !phoneNum) {

    res.status(400).end();
    return;
  }

  // console.log(userId, phoneNum);
  if (userId) {
    db.User.findById(userId)
      .then(doc => res.status(200).send(doc))
      .catch(err => res.status(500).send(err.toString()));
  } else {
    db.User.findOne({ phone_num: phoneNum })
      .then(doc => res.status(200).send(doc))
      .catch(err => res.status(500).send(err.toString()));
  }
};

exports.addUser = (req, res) => {
  const docs = req.body;
  if (req.body.password) {
    req.body.password = auth.createHash(req.body.password)
  }
  parsePhoneNumbers(docs);

  console.log('DOCS', docs)
  if (!docs) {
    res.status(400).send('Not a valid phone number. Please enter a 10 digit phone number.');
    return;
  }
  //Checks if guest account exists and updates to make full account
  db.User.updateOne({phone_num: docs.phone_num, isGuest: true}, docs)
  .then(result => {
    if (result && result.acknowledged && result.modifiedCount) {
      res.status(200).send('add a new user');
      return null;
    } else {
  //Adds user to db.
      return db.User.insertMany(docs)
    }
  })
  .then((results) => {
    console.log('results in 73', results)
    if (results) {
      res.status(200).send(results);
    }
  })
  .catch(err => {
    console.error(err.code);
    if (err.code === 11000) {
      res.status(401).send('An account with this phone number already exists.')
    } else {
      res.status(500).send(err.toString());
    }
  });

};

exports.updateUser = function (req, res) {
  const userId = req.query.user_id;
  const update = req.body;
  if (update && update.password) {
    update.password = auth.createHash(update.password);
    update.is_guest = false;

  }
  // console.log('update', userId,req.body, update);
  if (!userId || !update || !(update instanceof Object)) {
    res.status(400).end();
    return;
  }
  db.User.findOneAndUpdate({_id: userId}, update, {returnDocument: 'after'})
    .then(result => {
      // console.log('update', result);
      if (result) {
        // res.set({"token": auth.makeToken({user_id: result.id, name: result.name})});
        res.status(203).send('updated');
      }
    })
    .catch(err => res.status(500).send(err.toString()));
};

exports.signUp = (req, res) => {
  let {user} = req.body;
  console.log('user', user);
  const parsed = req.body.user.phone_num && parsePhoneNumber(req.body.user.phone_num, 'US');
  user.phone_num = parsed && parsed.number;
  console.log('user signup', user);
  db.User.findOne({ phone_num: user.phone_num })
    .then((result) => {
      console.log('findone', result);
      if (!result) {
        req.body = user;
        exports.addUser(req, res)
      } else if (result.is_guest) {
        req.query.user_id = result.id;
        req.body = user;
        exports.updateUser(req, res)
      } else {
        res.status(400).send('You already has an account')
      }
    })
    .catch(err => res.status(500).send(err.toString()));

}