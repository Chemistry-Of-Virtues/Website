To Setup (Windows):

Install node.js https://nodejs.org/en/download/

Install mongodb from https://www.mongodb.com/download-center/community and create /data/db in your home directory. 

Run "npm install"

Run "npm install -g nodemon"

Configure /config/dev.env with the following variables:
  <br>PORT // The port used by the express app
  <br>MONGODB_URL // The url of your mongodb database (should be 'mongodb://127.0.0.1:27017/chemistry-of-virtues')
  <br>JWT_SECRET // The secret for the JSON web tokens

To Run: 
  
Run "npm run db"

Start database. (mongoDB file path + /bin/mongod)

The project will then be available locally on the specified port.

Note on File Structure:

Place all .html files in the root public folder. Place script files in the public/scripts folder and stylesheets in the public/stylesheets folder.

Useful utilities:

Postman: HTTP requests interface
https://www.getpostman.com/downloads/

Robo 3T: GUI for mongoDB databases
https://robomongo.org/download

To Run the Project(Windows):

Run "& 'C:\Program Files\MongoDB\Server\4.2\bin\mongod'"

Run "npm run dev"

It will be available on the port specified in the dev.env file
