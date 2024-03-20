var express = require('express');
const { login } = require('../controllers/user.controller');
var router = express.Router();

router.post('/login', login);


module.exports = router;
