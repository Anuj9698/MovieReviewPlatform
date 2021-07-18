const express = require('express');
const router = express.Router();
const jwtExpress = require('../utils/expressJwt');

const userAuth = require('./userAuth');
const movie = require('./movie');
const userReview = require('./userReview');

/* Application Routes */
router.use('/userAuth', userAuth);

router.use('/movie', movie);
router.use('/userReview', jwtExpress, userReview);

module.exports = router;
