require('dotenv').config();
const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const parsePhoneNumber = require('libphonenumber-js');
const jwt = require('jsonwebtoken');

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
    db.User.findOne({phone_num: phoneNumber},).select("+password")
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
                        res.status(200).send({
                            name: user.name,
                            phone_num: user.phone_num,
                            id: user.id,
                            friends: user.friends,
                            token: jwt.sign({
                                name: user.name,
                                user_id: user.id
                            }, process.env.JWT_AUTH_SECRET_KEY, { expiresIn: '24h' })
                        });

                    }
                }
            })
        } else {
            console.log('ERR FINDING USER')
            res.status(401).send('There is no account registered to this username. Please try again or sign up below.')
        }
    })
}

exports.sendCode = function (req, res) {
    // get the user object from the DB
    // create a code
    // save a timestamp and the code to the user obj
    // send a text to the user with said code, return 201
}

exports.verifyCode = function (req, res) {
    // parse code from req
    // store current timestamp
    // retrieve user obj from DB
    // compare the codes and the timestamps
        // same: set verified to true and save timestamp
        // return 201
        // otherwise return 406
}

// console.log(exports.verifyPass('Voeiroak', newPass));
