var express = require('express');
var router = express.Router();

const user = require('./user');
const role = require('./role');
const action = require('./action');

/* GET home page. */
router.get('/', function (_, res) {
	res.send('OK');
});

router.use('/user' , user);
router.use('/role', role);
router.use('/action', action);

module.exports = router;
