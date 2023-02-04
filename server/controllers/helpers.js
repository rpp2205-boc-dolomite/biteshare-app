require('dotenv').config();


exports.sendTexts = async function (input) {
  // this is an async function and returns an array of results
  // Accepts an array of these arrays: ['+12223334444', "Hello! This is a text from BiteShare!"]
  // https://www.twilio.com/docs/sms/api

  if (!Array.isArray(input.friends) || !input.friends.length) { return }

  const from = process.env.TWILIO_PHONE_NUM;
  const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  const promises = [];
  console.log('here in helper.js', input.friends);
  input.friends.forEach((element) => {
    console.log('here')
    promises.push(
      client.messages.create({
        body: `Hi ${element.name}: \n You have been invited to split the bill at ${input.rest_name} \n Please select the link below to view the meal session \n www.google.com`,
        from: process.env.TWILIO_PHONE_NUM,
        to: "+14086934417"
      })
   )
  });
  console.log('promises', promises);
  // for (const [to, body] of array) {
  //   promises.push(client.messages
  //     .create({ body, from, to })
  //     .then(message => message.error_code ? message.error_code : message.sid));
  // }

  return Promise.all(promises);
};

exports.sendAllFriendHasPaidTexts = function(textBody) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: `\n
      Hi, ${textBody['host_name']}: \n All the participants in this meal session have completed payment.\n
      - Details -
      Restaurant: ${textBody['restaurant']}
      Total: $${textBody['sub_total'] + textBody['tip_total']}
      `,
      from: process.env.TWILIO_PHONE_NUM,
      to: process.env.MY_PHONE_NUM // temporary, change to host when production
    })
    .then(message => console.log('message successfully sent!', message.sid))
    .catch(e => console.log('failed to send text', e))
};