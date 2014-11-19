var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Ericsson JumpStart Server' });
});

router.get('/filemanager', function(req, res) {
    res.render('filemanager', { title: 'Ericsson JumpStart Server' });
});

module.exports = router;
