require('dotenv').config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACbda9c3e289f2dbe3c999396fe5fef967";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({ body: "Hello from Twilio", from: "+18444824987", to: "+14086934704" })
  .then(message => console.log(message.sid));