const express = require('express');
const router = express.Router();
CategoryController = require('../controllers/category')

router.get('/all', CategoryController.list);

module.exports = router;
