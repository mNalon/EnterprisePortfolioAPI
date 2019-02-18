var express = require('express');
var router = express.Router();

const user = require('./user')

/* GET home page. */
router.get('/', function(_, res) {
  res.send('OK')
});

router.use('/user', user);

module.exports = router;
