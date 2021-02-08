"use strict";

var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})

const middlewares = require('../middlewares');
const AuthController = require('../controllers/auth');

router.post('/login', AuthController.login);
router.post('/customer/register', upload.single('userImage'), AuthController.registerCustomer);
router.post('/chef/register', upload.single('userImage'), AuthController.registerChef);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);


module.exports = router;