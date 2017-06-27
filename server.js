'use strict';
var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session');

var app = express();
require('dotenv').config();// require('dotenv').load();
require('./app/config/passport')(passport);

//Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
//`open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()` , { useMongoClient: true }
mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});

