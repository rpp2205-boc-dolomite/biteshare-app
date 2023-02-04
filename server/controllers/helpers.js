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
        to: "+14086934704"
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

exports.sendTelesignTexts = function(callback) {
  var TeleSignSDK = require('telesignsdk');

  const customerId = "B4103BB0-D209-480D-A717-BAE8ECB8AE65";
  const apiKey = process.env.TELESIGN_API;
  const rest_endpoint = "https://rest-api.telesign.com";
  const timeout = 10*1000; // 10 secs

  const client = new TeleSignSDK( customerId,
  apiKey,
  rest_endpoint,
  timeout // optional
  // userAgent
  );

  const phoneNumber = "14086934417";
  const message = "You're scheduled for a dentist appointment at 2:30PM.";
  const messageType = "ARN";

  console.log("## MessagingClient.message ##");

  function messageCallback(error, responseBody) {
  if (error === null) {
  console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
      ` => code: ${responseBody["status"]["code"]}` +
      `, description: ${responseBody["status"]["description"]}`);
  } else {
  console.error("Unable to send message. " + error);
  }
  }
  client.sms.message(callback, phoneNumber, message, messageType);
}