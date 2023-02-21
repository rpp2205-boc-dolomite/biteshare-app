# BiteShare - The GOAT of check-splitting apps
<img src="https://user-images.githubusercontent.com/86500068/217312952-d522520d-0dac-4ab5-97fa-19c453df08fd.png" width="200" height="200" />

## The Team
- [Matt Alexander](https://github.com/malexander6) (Product Manager)
- [Heather Ray](https://github.com/bubsinthemountains) (Architecture Owner)
- [Stacey Pereira](https://github.com/staceypereira1) (UI Owner)
- [Yuchen Pan](https://github.com/pyc0422)
- [Yui Murayama](https://github.com/Yui1002)
- [Zachary Atha](https://github.com/zacharyatha)

## Introduction

## What does BiteShare do?

## Tech stack
![JavaScript](https://img.shields.io/badge/JavaScript%20-%23323330.svg?&style=flat-square&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/-NodeJS-brightgreen?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React%20-%2320232a.svg?&style=flat-square&logo=react&logoColor=%2361DAFB)
![HTML](https://img.shields.io/badge/HTML5%20-%23E34F26.svg?&style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3%20-%231572B6.svg?&style=flat-square&logo=css3&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF.svg?&style=flat-square&logo=mui&logoColor=white)
![MongoDB](https://img.shields.io/badge/-Mongodb-47A248.svg?style=flat-square&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325.svg?&style=flat-square&logo=Jest&logoColor=white)
 - FrontEnd: React | Material UI | CSS

 - BackEnd:  NodeJS | Express | MongoDB

 - Testing:  Jest | React Testing library

 - Deploy:   MongoDB Atlas 

## Technical Challenges

## Video walkthrough

## How does BiteShare work?

1. Installing Dependencies

 ```
 npm install
 ```

2. edit `config.example.js` file and change name to `.env`
 Follow the instruction in `config.example.js` file. You will need MongoDB Atlas, Twilio, Yelp, JWT accounts.
 ```
 PORT="Your Port"
 CORS_ORIGIN="Deployed URL"
 #accessing mongodb atlas
 DB_CLUSTER="Your mongoDb cluster"
 DB_NAME="Your database name"
 DB_USER="Your database user"
 DB_PASS="Your database password"
 #accessing twilio api
 TWILIO_BASE_URL="Twilio base URL"
 TWILIO_ACCOUNT_SID="Your twilio sid"
 TWILIO_AUTH_TOKEN="Your twilio auth token"
 TWILIO_PHONE_NUM="Your twilio phone number"
 #accessing yelp api
 YELP_CLIENT_ID="Your yelp client id"
 YELP_TOKEN="Your yelp token"
 #accessing jwt
 JWT_AUTH_SECRET_KEY="Your JWT secret key"
 ```
3. Running App
```
npm build
npm run start
```
4. Running App In Development

```
npm build
npm run dev
npm run react-dev
```

## Reasearch required
- Yelp API
- Twilio API
- CI workflows

## Lessons / Takeaways

## Non-MVP tickets (optional)

## Notes
