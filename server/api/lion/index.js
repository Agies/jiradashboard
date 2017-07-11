'use strict';

var express = require('express');
var controller = require('./lion.controller');

var router = express.Router();

router.get('/:sprint/:lion', controller.index);
router.put('/', controller.save);
router.post('/', controller.update);
router.get('/', controller.load);

module.exports = router;
