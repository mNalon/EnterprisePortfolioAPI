var UserModel = require('../models/user.js');

const createErrorResponse = require('./util').createErrorResponse;

const getUserError = createErrorResponse('Error when getting User.');
const userNotFoundError = createErrorResponse('No such User');
const createUserError = createErrorResponse('Error when creating User');
const updateUserError = createErrorResponse('Error when updating User');
const deleteUserError = createErrorResponse('Error when deleting the User');


module.exports = {
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json(getUserError(err));
            }
            return res.json(users);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json(getUserError(err));
            }
            if (!user) {
                return res.status(404).json(userNotFoundError());
            }
            return res.json(user);
        });
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
            return res.status(201).json(user);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json(getUserError(err));
            }
            if (!user) {
                return res.status(404).json(userNotFoundError());
            }

            user.name = req.body.name ? req.body.name : user.name;
			user.userName = req.body.userName ? req.body.userName : user.userName;
			user.role = req.body.role ? req.body.role : user.role;
            user.email = req.body.email ? req.body.email : user.email;
            user.email = req.body.password ? req.body.password : user.password;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json(updateUserError(err));
                }

                return res.json(user);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json(deleteUserError(err));
            }
            return res.status(200).json(user);
        });
    }
};
