const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');

router.get('/show', showController.get);
router.get('/show/:id', showController.getById);
router.post('/show/movie/:id/room/:roomId', showController.post);
router.put('/show/:id', showController.put);
router.delete('/show/:showId/movie/:movieId', showController.delete);

module.exports = router;