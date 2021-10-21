const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const { read } = require('fs');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const conn = process.env.DB_STRING;



/**
 * -------------- SESSION SETUP ----------------
 */
// const sessionStore = new MongoStore({ mongooseConnection: connection,collection: 'session'});

// app.use(session({
//     secret: process.env.secret,
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//         maxAge: 1000 * 60 * 24
//     }
// })); 

// app.get('/', (req, res, next)=>{

//     if (req.session.viewCount){
//         req.session.viewCount = req.session.viewCount + 1;
//     }else{
//         req.session.viewCount = 1;
//     }
//     res.send(`<h1>you have visited this page ${req.session.viewCount}`)
// });

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require('./config/passport');

 
app.use(passport.initialize());
app.use(passport.session());

// app.use((req,res,next)=>{
//     console.log(req.session);
//     console.log(req.user);
// });

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
require('./routes')(app)


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000

// const connection = mongoose.createConnection(conn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ).then(() => {
    app.listen(8080);
})
