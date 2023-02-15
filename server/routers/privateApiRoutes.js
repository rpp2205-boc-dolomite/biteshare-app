const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const userControllers = require('../controllers/user');
const friendsControllers = require('../controllers/friend');
const sessionControlers = require('../controllers/sessions');
const authControllers = require('../controllers/auth.js');
const homeController = require('../controllers/home.js');
const { getBiz } = require('../controllers/yelpBiz.js');
const { addReactionToSession, addCommentToSession } = require('../controllers/social');

router.use(verifyToken);

//---  user's friends list ---//
router.get('/friends', friendsControllers.getFriends);
router.post('/friends', friendsControllers.addFriend);
router.put('/friends', friendsControllers.deleteFriend);

//---- user info ---//
router.get('/users', userControllers.getUser);
router.post('/users', userControllers.addUser);
router.put('/users',userControllers.updateUser);

//---sessions ---//
router.get('/sessions', sessionControlers.getSessions)
router.post('/sessions', sessionControlers.postSessions);
router.post('/sessions/status', sessionControlers.updatePaymentStatus);
router.get('/sessions/friend', sessionControlers.checkIfUserInFriendsList);

//---- yelp businesses ---//
router.get('/biz', (req, res) => {
  getBiz(req.query.location, req.query.radius)
    .then ((results) => {
      res.status(200);
      res.send(results.data.businesses);
    })
    .catch ((err) => {
      console.log(err);
    });
});

//---- social ----//
router.post('/social/comment/:session_id', addCommentToSession);
router.post('/social/reaction/:session_id', addReactionToSession);

//---- user feed ---//
router.get('/feed', homeController.getFeed);

module.exports = router;