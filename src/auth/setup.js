var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;

const authenticate = require('./authenticate');
const session = require('./session');

passport.use(new LocalStrategy({
	usernameField: 'userName',
	passwordField: 'password'
}, authenticate));

passport.serializeUser(session.serialize);

passport.deserializeUser(session.deserializeUser);

module.exports = passport;