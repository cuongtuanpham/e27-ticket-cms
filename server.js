//Set up variable, required modules
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var session = require('express-session');
var parseurl = require('parseurl');
// var cookieParser = require('cookie-parser');
//==========================================
//Set the port for API
var port = process.env.PORT || 3000;
//==========================================

//use bodyParser to get data from post request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//log request to the console
app.use(morgan('dev')); //color output

//handle CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//==========================================

//====Routes====
app.use('/', express.static(__dirname + "/public"));
//====Start server====
app.listen(port);
console.log(port + " is connected"); 
