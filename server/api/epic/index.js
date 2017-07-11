'use strict';

var express = require('express');
var controller = require('./epic.controller');

var router = express.Router();

router.get('/:key', controller.index);

module.exports = router;