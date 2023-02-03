require('dotenv').config();


exports.sendTexts = async function (input) {
  // this is an async function and returns an array of results
  // Accepts an array of these arrays: ['+12223334444', "Hello! This is a text from BiteShare!"]
  // https://www.twilio.com/docs/sms/api

  if (!Array.isArray(input.friends) || !input.friends.length) { return }

  const from = process.env.TWILIO_PHONE_NUM;
  const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  //const promises = [];

  const promises = input.friends.map((element) => {
    return(
      client.messages.create({
        body: `Hi ${element.name}: \n You have been invited to split the bill at ${input.restInfo.name} \n Please select the link below to view the meal session \n www.google.com`,
        from: from,
        to: `${element.phone_num}`
      })
      .then(message => console.log(message.sid))
    )
  })

  // for (const [to, body] of array) {
  //   promises.push(client.messages
  //     .create({ body, from, to })
  //     .then(message => message.error_code ? message.error_code : message.sid));
  // }

  return Promise.all(promises);
};