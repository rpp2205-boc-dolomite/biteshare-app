const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const parsePhoneNumber = require('libphonenumber-js');

exports.createHash = function(password) {
    var salt = bcrypt.genSaltSync(8)

    return bcrypt.hashSync(password, salt, null)

};

exports.verifyLogin = function(req, res) {
    const parsed = parsePhoneNumber(req.body.phone_num, 'US');
    if (!parsed) {
        console.log(req.body);
        res.status(500).send("Connot parse phone number");
        return;
    }
    const phoneNumber = parsed.number;
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
                        res.status(401).send('The password you have entered is incorrect. Please try again.')
                    } else {
                        res.status(200).send({name: user.name, phone_num: user.phone_num, id: user.id})
                    }
                }
            })
        } else {
            console.log('ERR FINDING USER')
            res.status(401).send('There is no account registered to this username. Please try again or sign up below.')
        }
    })
}


// console.log(exports.verifyPass('Voeiroak', newPass));
