const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/room', roomController.get);
router.get('/room/:id', roomController.getById);
router.post('/room', roomController.post);
router.put('/room/:id', roomController.put);
router.delete('/room/:roomId/show/:showId/movie/:movieId', roomController.delete);

module.exports = router;