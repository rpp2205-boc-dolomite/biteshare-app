const db = require('../db/db.js');
const bcrypt = require('bcrypt');

exports.createHash = function(password, res) {
    var salt = bcrypt.genSaltSync(8)
    var result = {
        withSalt: bcrypt.hashSync(password, salt, null),
        withoutSalt: bcrypt.hashSync(password, salt, null).slice(29)
    }
    return result
};
exports.testPass = exports.createHash('password1')
// console.log(testPass)
exports.verifyLogin = function(req, res) {
    db.User.findOne({phone_num: req.body.phone_num})
    .then((user) => {
        console.log('user from DB', user)
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500)
            } else {
                console.log('result of compare', result);
                if (result === false) {
                    res.status(401).send('password')
                } else {
                    res.status(200)
                }
            }
        })
    })
}


// console.log(exports.verifyPass('Voeiroak', newPass));
