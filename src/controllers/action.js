var ActionModel = require('../models/action.js');

const createErrorResponse = require('./util').createErrorResponse;

const getActionError = createErrorResponse('Error when getting Action.');

module.exports = {

	list: function (req, res) {
		ActionModel.find(function (err, actions) {
			if (err) {
				return res.status(500).json(getActionError(err));
			}
			return res.json(actions);
		});
	}
};
