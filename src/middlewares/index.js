const { accessControl, isUserLogged } = require('./auth');

const { jsonInputValidation } = require('./validation');

module.exports.auth = {
	accessControl,
	isUserLogged
};

module.exports.validation = {
	jsonInputValidation
};