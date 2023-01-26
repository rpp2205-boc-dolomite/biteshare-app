require('dotenv').config();


exports.sendTexts = async function (array) {
  // Accepts an array of these arrays: ['+12223334444', "Hello! This is a text from BiteShare!"]
  // https://www.twilio.com/docs/sms/api

  if (!Array.isArray(array) || !array.length) { return }

  const from = process.env.TWILIO_PHONE_NUM;
  const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  const promises = [];

  for (const [to, body] of array) {
    promises.push(client.messages
      .create({ body, from, to })
      .then(message => message.sid));
  }

  return Promise.all(promises);
};