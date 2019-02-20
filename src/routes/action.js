var express = require('express');
var router = express.Router();
var ActionController = require('../controllers/action.js');

router.get('/list', ActionController.list);

module.exports = router;
