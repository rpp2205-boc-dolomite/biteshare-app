const db = require('../db/db');
const { Types } = require('mongoose');

const reactionsContainUser = (reactions, user_id) => {
  for (const emoji of reactions.emojis) {
    console.log('single', user_id);
    if (Array.isArray(reactions[emoji]) && reactions[emoji].find(user => user.equals(user_id))) {
      return true;
    }
  }
  return false;

};

exports.addReactionToSession = function (req, res) {
  const session_id = req.params.session_id;
  const { user_id, emoji } = req.body;
  console.log('emopji', session_id, user_id, emoji);
  if (!session_id || !user_id || !emoji) {
    res.status(400).send('data missing');
    return;
  }

  db.Session.findOne({ _id: session_id }, { reactions: 1 })
    .then(result => {
      const reactions = result.reactions;
      console.log('result', reactions);
      if (reactions && !reactions.emojis) {
        // if no emojis array, create a new reactions obj from template
        const newReactions = Object.assign({}, db.reactionsTemplate);
        newReactions[emoji].push(Types.ObjectId(user_id));
        return db.Session.updateOne({ _id: session_id }, { reactions: newReactions });
      } else {
        if (reactions[emoji].find(user => user.equals(user_id))) {
          res.status(400).send('user already reacted');
          return null;
        } else {
          reactions[emoji].push(Types.ObjectId(user_id));
          return db.Session.updateOne({ _id: session_id }, { reactions: { ...reactions } });
        }
      }
    })
    .then(result => {
      if (!result) {
        return null;
      } else if (result.acknowledged && result.matchedCount ) {
        res.status(200).send(result);
      } else {
        res.status(400).send(result);
      }
    })
    .catch(err => {
      res.status(500).send(err.toString());
    });
};

exports.addCommentToSession = function (req, res) {
  const session_id = req.params.session_id;
  const { user_id, text } = req.body;

  if (!session_id || !user_id || !text) {
    res.status(400).send('data missing');
    return;
  }

  const comment = { user_id, text };

  db.Session.updateOne({ _id: session_id }, { $push: { comments: comment } })
  .then(result => {
    if (result && result.acknowledged && result.modifiedCount ) {
      res.status(201).send(result);
    } else {
      res.status(409).send(result);
    }
  })
  .catch(err => {
    res.status(500).send(err.toString());
  });
};