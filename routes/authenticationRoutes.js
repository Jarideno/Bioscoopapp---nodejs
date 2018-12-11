const express = require('express');
const router = express.Router();
const authenticantionController = require('../controllers/authenticationController');

router.post('/login', authenticantionController.login);
router.post('/register', authenticantionController.register);

module.exports = router;