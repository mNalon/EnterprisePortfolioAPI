var express = require('express');

var router = express.Router();
var RoleController = require('../controllers/role.js');

router.get('/list', RoleController.list);

router.get('/:id', RoleController.show);

router.put('/:id', RoleController.update);

module.exports = router;
