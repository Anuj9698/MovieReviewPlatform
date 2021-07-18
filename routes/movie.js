const express = require('express');
const router = express.Router();
const {
  addMovie,
  getMovieList,
  getUsersReviewOnMovie,
} = require('../controller/movieList');

router.post('/addMovie', addMovie);
router.get('/list', getMovieList);
router.get('/:movieId/getUserReview', getUsersReviewOnMovie);

module.exports = router;
