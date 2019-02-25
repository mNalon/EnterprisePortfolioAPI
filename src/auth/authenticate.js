const UserModel = require('../models/user.js');

const createErrorResponse = require('../util').createErrorResponse;

const incorrectUserNameError = createErrorResponse('Incorrect username.');
const incorrectPasswordError = createErrorResponse('Incorrect password.');

module.exports = 	function (userName, password, done) {
	UserModel
		.findOne({ userName })
		.populate({
			path: 'role',
			populate: { path: 'actions' }
		})
		.select('+password')
		.then((user) => {
			if (!user) {
				return done(null, false, incorrectUserNameError());
			}

			return user.verifyPassword(password)
				.then((valid) => {
					if (!valid) return done(null, false, incorrectPasswordError());
					//tweak to not reveal password 
					user.password = undefined;
					return done(null, user);
				});
		})
		.catch(done);
}; 