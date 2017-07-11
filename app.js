var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require("fs");

// mongodb new lib add
//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:27017/bookdb');

var routes = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var mockapi = require('./routes/mockapi');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//////////////////////config//////////////////////////////////////////////////
var config = { "db": {
  'port': 27017,
  'host': 'localhost',
  "database": "bookdb"
  }
};
try {
    var path = path.join(__dirname+"/config.json");
    //console.log(path);
    config = JSON.parse(fs.readFileSync(path, 'utf8'));
} catch(e) {
  // ignore
}
module.exports.config = config;
////////////////////////////////////////////////////////////////////////

// Add headers
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/////////////////// route setting //////////////////////////////////
app.use('/', routes);
app.use('/users', users);
app.use('/books', books);
app.use('/shops', mockapi);
/////////////////////////////////////////////////////


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404);
  res.json({
    'status': '404',
    'url': req.originalUrl,
    'error': 'Not found'
  });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'status': err.status,
    'url': req.originalUrl,
    'error': err
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/////////////////////mongodb connect//////////////////////////
connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  console.log('Express app started on port ' + 3333);
}

function connect () {
  var db = config.db.host + ":" +  config.db.port + "/" + config.db.database;
  //console.log("db : " + db);
  return mongoose.connect(db).connection;
}
///////////////////////////////////////////////

module.exports = app;
