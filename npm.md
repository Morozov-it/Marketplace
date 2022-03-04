# All installed dependencies

Server:
npm install express pg pg-hstore sequelize cors dotenv
npm install -D nodemon
npm i express-fileupload
npm i uuid
npm i jsonwebtoken bcrypt

Front:
npm i axios react-router-dom mobx mobx-react-lite
npm install react-bootstrap bootstrap@5.1.3
npm i jwt-decode

# Launch
front: >cd client 
    npm start (PORT 3000);
back: >cd server
    npm run dev (PORT 5000);
