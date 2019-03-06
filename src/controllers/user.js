var UserModel = require('../models/user.js');

const createErrorResponse = require('../util').createErrorResponse;

const passport = require('../auth');

const getUserError = createErrorResponse('Error when getting User.');
const getRoleAndActionsError = createErrorResponse('Error when getting Role and Actions.');
const userNotFoundError = createErrorResponse('No such User');
const createUserError = createErrorResponse('Error when creating User');
const updateUserError = createErrorResponse('Error when updating User');
const deleteUserError = createErrorResponse('Error when deleting User');
const authUserError = createErrorResponse('Error when authenticating User.');

module.exports = {
	login: function (req, res, next) {
		passport.authenticate('local', function (err, user, info) {
			if (err) return res.status(500).json(authUserError(err));
			if (!user) return res.status(401).json(info); 
			req.logIn(user, function (err) {
				if (err) return res.status(500).json(authUserError(err));
				return res.status(200).json(user);
			});
		})(req, res, next);
	},

	sessionInfo: function (req, res) {
		return res.json(req.user);
	},

	logout: function (req, res) {
		req.logout();
		res.redirect('/');
	},

	list: function (req, res) {
		// hiding the admin user: muhahaha!
		UserModel
			.find({ userName: { $nin: [ 'nalon' ] } })
			.populate({
				path: 'role',
				populate: { path: 'actions' }
			})
			.then(users => res.json(users))
			.catch(err => res.status(500).json(getUserError(err)));
	},

	show: function (req, res) {
		var id = req.params.id;
		UserModel
			.findOne({_id: id})
			.populate({
				path: 'role',
				populate: { path: 'actions' }
			})
			.then(user => {
				if (!user) {
					return res.status(404).json(userNotFoundError());
				}
				return res.json(user);
			})
			.catch(err => res.status(500).json(getUserError(err)));
	},

	create: function (req, res) {
		var User = new UserModel({
			name : req.body.name,
			userName : req.body.userName,
			role : req.body.role,
			email : req.body.email,
			password: req.body.password
		});

		User.save(function (err, user) {
			if (err) {
				return res.status(500).json(createUserError(err));
			}
			user.password = undefined;
			return UserModel
				.populate(user, {
					path: 'role',
					populate: { path: 'actions' }
				})
				.then(populatedUser => res.status(201).json(populatedUser))
				.catch(err => res.status(500).json(getRoleAndActionsError(err)));
		});
	},

	update: function (req, res) {
		var id = req.params.id;
		UserModel
			.findOne({_id: id})
			.then(user => {
				if (!user) {
					return res.status(404).json(userNotFoundError());
				}
				user.name = req.body.name ? req.body.name : user.name;
				user.userName = req.body.userName ? req.body.userName : user.userName;
				user.role = req.body.role ? req.body.role : user.role;
				user.email = req.body.email ? req.body.email : user.email;
				user.password = req.body.password ? req.body.password : user.password;
				user.save(function (err, user) {
					if (err) {
						return res.status(500).json(updateUserError(err));
					}
					user.password = undefined;
					return UserModel
						.populate(user, {
							path: 'role',
							populate: { path: 'actions' }
						})
						.then(populatedUser => res.status(201).json(populatedUser))
						.catch(err => res.status(500).json(getRoleAndActionsError(err)));
				});
			})
			.catch(err => res.status(500).json(getUserError(err)));
	},

	remove: function (req, res) {
		var id = req.params.id;
		UserModel
			.findByIdAndRemove(id)
			.populate({
				path: 'role',
				populate: { path: 'actions' }
			})
			.then(user => {
				if (!user) {
					return res.status(404).json(userNotFoundError());
				}
				return res.status(200).json(user);
			})
			.catch(err => res.status(500).json(deleteUserError(err)));
	}
};
