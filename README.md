# BiteShare | "Make splitting bills simple and easy"
<img  src="https://user-images.githubusercontent.com/86500068/217312952-d522520d-0dac-4ab5-97fa-19c453df08fd.png"  width="200"  height="200" />

## The Team
- [Matt Alexander](https://github.com/malexander6) (Product Manager)
- [Heather Ray](https://github.com/bubsinthemountains) (Architecture Owner)
- [Stacey Pereira](https://github.com/staceypereira1) (UI Owner)
- [Yuchen Pan](https://github.com/pyc0422)
- [Yui Murayama](https://github.com/Yui1002)
- [Zachary Atha](https://github.com/zacharyatha)

## Introduction
BiteShare is basically an app designed for splitting the bill among a group of would-be restaurant patrons in a fun and engaging way. We developed this over the span of 3 weeks as part of our final project before graduating from [Hack Reactor](https://www.hackreactor.com/). If you would like to try it out, check out our demo: [BiteShare Demo](https://biteshare.ecitytech.net).

## Tech stack
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
- FrontEnd: React | Material UI | CSS
- BackEnd: NodeJS | Express | MongoDB
- Testing: Jest | React Testing library
- Deploy: MongoDB Atlas

## How does BiteShare work?
1.  Installing Dependencies
    ```
    npm install
    ```

2.  Edit `config.example.js` file and change name to `.env`
    Follow the instruction in `config.example.js` file. You will need MongoDB, Twilio, Yelp, JWT accounts.
    ```
    #===== Node =====================>>
    
    PORT="3000"  ## port number that the Node process will run on
    
    CORS_ORIGIN="https://app.mydomain.dev/"  ## public endpoint url of the app (if applicable)
    
    
    #===== MongoDB ==================>>
    
    DB_URI="127.0.0.1"  ## IP address or domain of MongoDB instance (not a cluster)
    
    DB_PORT="27017"  ## Port number of Mongo instance (not a cluster)
    
    #DB_CLUSTER="cluster0.abcdefg.mongodb.net" ## MonogDB cluster URI (if applicable)
    
    DB_NAME="biteshare"  ## name of the Mongo collection
    
    DB_USER="user"  ## Mongo username
    
    DB_PASS="password"  ## Mongo password
    
    
    #===== Twilio API ===============>>
    
    TWILIO_BASE_URL="https://api.twilio.com/2010-04-01"  ## base URL provided by Twilio
    
    TWILIO_ACCOUNT_SID=""  ## account SID provided by Twilio
    
    TWILIO_AUTH_TOKEN=""  ## your Twilio auth token
    
    TWILIO_PHONE_NUM=""  ## your Twilio phone number to send from
    
    
    #===== Yelp API =================>>
    
    YELP_CLIENT_ID=""  ## your Yelp client ID
    
    YELP_TOKEN=""  ## you Yelp token
    
    
    #===== Server/Client Auth =======>>
    
    JWT_AUTH_SECRET_KEY=""  ## a 256-bit secret key
    
    
    #===== HTTPS stuff ==============>>
    
    USE_SSL=true  ## anything other than "true" evaluates to false
    
    SSL_KEY_FILE="server.key"  ## filename of your key file that is in 'server/https'
    
    SSL_CERT_FILE="server.cert"  ## filename of your cert file that is in 'server/https'
    ```

3.  Running App
    ```
    npm run create-cert  ## only needed if using HTTPS
    
    npm build
    
    npm run start
    ```

4.  Running App In Development
    ```
    npm build
    
    npm run dev
    
    npm run react-dev
    ```
