const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const parsePhoneNumber = require('libphonenumber-js');

exports.createHash = function(password) {
    var salt = bcrypt.genSaltSync(8)

    return bcrypt.hashSync(password, salt, null)

};

exports.verifyLogin = function(req, res) {
    const phoneNumber = parsePhoneNumber(req.body.phone_num, 'US');
    if (!phoneNumber) {
        res.status(500).send("Connot parse phone number");
        return;
    }
    db.User.findOne({phone_num: phoneNumber})
    .then((user) => {
        console.log('user from DB', user)
        if (user !== null) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500)
                } else {
                    console.log('result of compare', result);
                    if (result === false) {
                        res.status(401).send('password')
                    } else {
                        res.sendStatus(200)
                    }
                }
            })
        } else {
            console.log('ERR FINDING USER')
            res.status(401).send('username')
        }
    })
}


// console.log(exports.verifyPass('Voeiroak', newPass));
