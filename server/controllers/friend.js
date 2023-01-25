exports.getFriends = function (req, res) {
  const userId = Number(req.query.user_id);
  if (!userId) {
    res.status(400).end();
    return;
  }

  db.User.findOne({ _id: userId }, { _id: 'user_id', friends: 1 })
    .populate('friends')
    .exec((err, document) => {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        res.status(200).send(document);
      }
    });
}