require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set("strictQuery", false)
const ObjectId = mongoose.Types.ObjectId;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const db = mongoose.connect(uri).catch(err => console.log('ERROR CONNECTIONG TO DB...', err));
const { Schema, model } = mongoose;

const userStatics = require('./statics/user');
const sessionStatics = require('./statics/session');

/////////////////////////////////////////////////////////////////

// Define the schemas
const UserSchema = new Schema({
  name: { type: String, required: true },
  phone_num: { type: String, required: true, match: /^\+1[0-9]{10}$/g , index: true, unique: true}, // this regex matches strings starting with a plus sign and 1, followed by 10 digits
  password: String,
  is_guest: Boolean,
  friends: [ { type: ObjectId, ref: 'User' } ]
}, {
  versionKey: false,
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

const SessionSchema = new Schema({
  host: { type: ObjectId, ref: 'User' },
  rest_name: { type: String, required: true },
  detail: Object,
  sub_total: { type: Number, required: true, min: 0 },
  tip_total: { type: Number, required: true, min: 0 },
  receipt: String,
  active: { type: Boolean, default: true }
}, {
  versionKey: false,
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

// Define the virtuals
  //

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

module.exports = { User, Session, ObjectId, disconnect };