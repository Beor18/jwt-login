const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/register', userController.postRegistro);

router.post('/login', userController.postLogin);

module.exports = router;