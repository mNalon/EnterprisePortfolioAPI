var express = require('express');
var router = express.Router();
var Joi = require('@hapi/joi');

var UserController = require('../controllers/user');
const { auth, validation } = require('../middlewares');

const UserJoiSchema = ({ requirePass = false } = {}) => Joi.object({
	_id: Joi.string(),
	name: Joi.string().required(),
	userName: Joi.string().required(),
	role: Joi.string().required(),
	email: Joi.string().email()
		.required(),
	password: requirePass? Joi.string().required() : Joi.string()
}).options({ stripUnknown: true });

router.post('/login', UserController.login);

router.get('/me', auth.isUserLogged, UserController.sessionInfo);

router.get('/logout', UserController.logout);

router.get('/list', auth.accessControl('view_users'), UserController.list);

router.get('/:id', auth.accessControl('view_users'), UserController.show);

router.post('/', auth.accessControl('create_users'), validation.jsonInputValidation(UserJoiSchema()), UserController.create);

router.put('/:id', auth.accessControl('edit_users'), validation.jsonInputValidation(UserJoiSchema({requirePass: false})), UserController.update);

router.delete('/:id', auth.accessControl('edit_users'), UserController.remove);

module.exports = router;
