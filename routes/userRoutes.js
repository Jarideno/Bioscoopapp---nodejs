const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/user/login', userController.login);
router.post('/user/register', userController.register);
router.put('/user', userController.put);
router.delete('/user', userController.delete);

module.exports = router;