const UserModel = require('../models/user.js');

module.exports.serialize = (user, done) => {
	done(null, user._id);
};

module.exports.deserializeUser = (id, done) => {
	UserModel
		.findById(id)
		.populate({
			path: 'role',
			populate: { path: 'actions' }
		})
		.then(user => done(null, user))
		.catch(done);
};