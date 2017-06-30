'use strict';

var express = require('express');
var controller = require('./lion.controller');

var router = express.Router();

router.get('/:sprint/:lion', controller.index);
router.post('/', controller.update);
router.post('/archive', controller.archive);
router.get('/', controller.load);

module.exports = router;