var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post('/login', UserController.login);

router.get('/me', auth.isUserLogged, UserController.sessionInfo);

router.get('/logout', UserController.logout);

router.get('/list', auth.accessControl('view_users'), UserController.list);

router.get('/:id', auth.accessControl('view_users'), UserController.show);

router.post('/', auth.accessControl('create_users'), UserController.create);

router.put('/:id', auth.accessControl('edit_users'), UserController.update);

router.delete('/:id', auth.accessControl('edit_users'), UserController.remove);

module.exports = router;
