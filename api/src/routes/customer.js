"use strict";

const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer');

/* GET users listing. */
router.put('/', CustomerController.update);
router.post('/order', CustomerController.order);
router.get('/', CustomerController.getSingle);

module.exports = router;
