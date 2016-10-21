var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var client = require('./client/backendclient');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname, 'angular/app')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({secret: 'mySecretKey', resave:false,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'jade');
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      client.retrieveUser({username:username,password:password}, function (err, user) {
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      });
    }
));


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.set('env','development');
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


module.exports = app;
