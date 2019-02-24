var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');

// router.post('/login', 
// 	passport.authenticate('local', { 
// 		successRedirect : '/user/me',
// 		failureRedirect : '/user/logout',
// 		failureFlash: true 
// 	}), UserController.sessionInfo);

router.post('/login', UserController.login);

router.get('/me', UserController.sessionInfo);

router.get('/logout', UserController.logout);

router.get('/list', UserController.list);

router.get('/:id', UserController.show);

router.post('/', UserController.create);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.remove);

module.exports = router;
