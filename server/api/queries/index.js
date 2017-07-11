'use strict';

var express = require('express');
var controller = require('./queries.controller');

var router = express.Router();

router.get('/', controller.load);

module.exports = router;
