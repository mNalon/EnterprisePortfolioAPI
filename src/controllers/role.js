var RoleModel = require('../models/role.js');

const createErrorResponse = require('../util').createErrorResponse;

const getRoleError = createErrorResponse('Error when getting Role.');
const roleNotFoundError = createErrorResponse('No such Role');
const updateRoleError = createErrorResponse('Error when updating User');

module.exports = {

	list: function (req, res) {
		RoleModel.find(function (err, roles) {
			if (err) {
				return res.status(500).json(getRoleError(err));
			}
			return res.json(roles);
		});
	},

	show: function (req, res) {
		var id = req.params.id;
		RoleModel.findOne({_id: id}, function (err, role) {
			if (err) {
				return res.status(500).json(getRoleError(err));
			}
			if (!role) {
				return res.status(404).json(roleNotFoundError());
			}
			return res.json(role);
		});
	},

	update: function (req, res) {
		var id = req.params.id;
		RoleModel.findOne({_id: id}, function (err, role) {
			if (err) {
				return res.status(500).json(getRoleError(err));
			}
			if (!role) {
				return res.status(404).json(roleNotFoundError());
			}

			role.name = req.body.name ? req.body.name : role.name;
			role.actions = req.body.actions ? req.body.actions : role.actions;
			
			role.save(function (err, role) {
				if (err) {
					return res.status(500).json(updateRoleError(err));
				}
				return res.json(role);
			});
		});
	}
};
