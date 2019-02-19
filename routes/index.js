var express = require('express');
var router = express.Router();

const user = require('./user');
const role = require('./role');

/* GET home page. */
router.get('/', function(_, res) {
  res.send('OK');
});

router.use('/user', user);
router.use('/role', role);

module.exports = router;
