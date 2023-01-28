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
  const phoneNum = '+' + req.query.phone_num.slice(1);
  if (!userId && !phoneNum) {
    res.status(400).end();
    return;
  }

  console.log(userId, phoneNum);
  if (userId) {
    db.User.findById(userId)
      .then(doc => res.status(200).send(doc))
      .catch(err => res.status(500).send(err.toString()));
  } else {

    db.User.findOne({ phone_num: phoneNum })
      .then(doc => {console.log(doc); res.status(200).send(doc)})
      .catch(err => res.status(500).send(err.toString()));
  }
};

exports.addUser = (req, res) => {
  const docs = req.body;
  parsePhoneNumbers(docs);
  req.body.password = auth.createHash(req.body.password)
  console.log(docs)
  if (!docs) {
    res.status(400).end();
    return;
  }

  db.User.insertMany(docs)
    .then((results) => {
      res.status(201).send(results);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err.toString());
    });
  // console.log('new user', req.body)
  // const docs = req.body;
  // if (!docs || !(docs instanceof Object)) {
  //   res.status(400).end();
  //   return;
  // }
  // let newUser = new db.User(req.body);
  // newUser.save()
  //   .then((result)=>{
  //     console.log('res',result);
  //     res.status(201).send(result.id);
  //   })
  //   .catch(err => console.error(err))
};

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
};