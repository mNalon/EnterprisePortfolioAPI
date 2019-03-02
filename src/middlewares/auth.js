const createErrorResponse = require('../util').createErrorResponse;

const getUnauthorizedError = createErrorResponse('Unauthorized.');
const getForbiddenError = createErrorResponse('Resource access forbidden.');

module.exports.isUserLogged = (req, res, next) => {
	if(!req.user) {
		return res.status(401).json(getUnauthorizedError());
	}
	next();
};

module.exports.accessControl = (action) => 
	(req, res, next) => {
		if(!req.user || 
			!req.user.role || 
			!req.user.role.actions || 
			!(req.user.role.actions instanceof Array) ||
			!req.user.role.actions.find(userAction => userAction.slug === action)) {
			return res.status(403).json(getForbiddenError());
		}
		next();
	};