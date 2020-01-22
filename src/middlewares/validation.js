const createErrorResponse = require('../util').createErrorResponse;

module.exports.jsonInputValidation = (joiSchema) =>
	(req, res, next) => {
		const validation = joiSchema.validate(req.body);
		if (validation.error) return res.status(400).json(createErrorResponse(validation.error.message)());
		next();
	};