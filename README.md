To run locally:

Install node.js https://nodejs.org/en/download/

Install mongodb and create /mongodb-data/ in your home directory (other directories may be used but should be configured in package.json) https://www.mongodb.com/download-center/community

Run "npm install"

Run "npm install -g nodemon"

Configure /config/dev.env with the following variables:
  <br>PORT // The port used by the express app
  <br>MONGODB_URL // The url of your mongodb database (should be mongodb://127.0.0.1:27017/chemistry-of-virtues)
  <br>JWT_SECRET // The secret for the JSON web tokens
  
Run "npm run db"

Run "npm run dev"

The project will then be available locally on the specified port.
