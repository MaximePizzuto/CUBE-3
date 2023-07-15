var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');

mongoose.connect('mongodb+srv://maxime:2T4VadBrAnmLy0JW@mongonode.vi8f1bb.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: true }));

var usersRoute = require('./routes/users');

app.use('/users', usersRoute);

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});