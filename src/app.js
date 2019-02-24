var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var passport = require('./auth');

var app = express();

app.use(session({ secret: 'EnterprisePortifolioApi' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

module.exports = app;
