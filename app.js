var express = require('express');
const mongoose = require('./databaseConnection');
var usersRouter = require('./routes/users');
var carsRouter = require('./routes/addCars');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

mongoose.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());


app.use('/auth', usersRouter);
app.use('/cars', carsRouter);



module.exports = app;
