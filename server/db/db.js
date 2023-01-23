require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set("strictQuery", false)
// const ObjectId = mongoose.Types.ObjectId;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const db = mongoose.connect(uri).catch(err => console.log('ERROR CONNECTIONG TO DB...', err));
const { Schema, model } = mongoose;

const userStatics = require('./statics/user');
const sessionStatics = require('./statics/session');

/////////////////////////////////////////////////////////////////

// Define the schemas
const UserSchema = new Schema({
  // TODO
}, {
  versionKey: false,
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

const SessionSchema = new Schema({
  // TODO
}, {
  versionKey: false,
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

// Define the virtuals
  // TODO

// Define the static methods
UserSchema.statics = userStatics;
SessionSchema.statics = sessionStatics;

// Compile the schemas
const User = model('User', UserSchema);
const Session = model('Session', SessionSchema);

User.createCollection();
Session.createCollection();

//////////////////////////////////////////////////

const disconnect = function () {
  return mongoose.connection.close();
}

//////////////////////////////////////////////////

module.exports = { User, Session, disconnect };