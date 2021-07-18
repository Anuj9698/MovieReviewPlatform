const express = require('express');
const router = express.Router();
const { addRatingAndReview } = require('../controller/userReview');

router.post('/', addRatingAndReview);

module.exports = router;
