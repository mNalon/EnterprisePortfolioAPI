var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');

router.get('/list', UserController.list);

router.get('/:id', UserController.show);

router.post('/', UserController.create);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.remove);

module.exports = router;
