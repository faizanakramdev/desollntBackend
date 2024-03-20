var express = require('express');
const { addCar } = require('../controllers/car.controller');
var router = express.Router();


router.post('/', addCar);

module.exports = router;
