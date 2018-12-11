const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/movie', movieController.get);
router.get('/movie/:id', movieController.getById);
router.get('/movie/title/:title', movieController.getByMovieTitle);
router.post('/movie', movieController.post);
router.put('/movie/:id', movieController.put);
router.delete('/movie/:id', movieController.delete);

module.exports = router;