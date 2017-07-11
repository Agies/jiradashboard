'use strict';

var express = require('express');
var controller = require('./lion.controller');

var router = express.Router();

router.get('/:sprint/:key', controller.index);
router.put('/:key', controller.save);
router.post('/', controller.update);
router.get('/', controller.load);

module.exports = router;
