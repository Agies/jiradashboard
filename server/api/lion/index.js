'use strict';

var express = require('express');
var controller = require('./lion.controller');

var router = express.Router();

router.get('/:lion', controller.index);

module.exports = router;