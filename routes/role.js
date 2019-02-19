var express = require('express');
var router = express.Router();
var RoleController = require('../controllers/role.js');

/*
 * GET
 */
router.get('/list', RoleController.list);

/*
 * GET
 */
router.get('/:id', RoleController.show);

/*
 * PUT
 */
router.put('/:id', RoleController.update);

module.exports = router;
