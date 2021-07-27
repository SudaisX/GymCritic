const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Gym = require('../models/gym');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const reviewsController = require('../controllers/reviews');

router.post('/', validateReview, isLoggedIn, catchAsync(reviewsController.createReview));

router.get('/', reviewsController.redirectBack);

router.delete('/:reviewID', isLoggedIn, isReviewAuthor, catchAsync(reviewsController.deleteReview));

module.exports = router;
