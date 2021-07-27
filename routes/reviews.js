const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Gym = require('../models/gym');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

const { validateReview } = require('../middleware');

router.post(
    '/',
    validateReview,
    catchAsync(async (req, res) => {
        const gym = await Gym.findById(req.params.id);
        const review = new Review(req.body);
        gym.reviews.push(review);
        await review.save();
        await gym.save();
        req.flash('success', 'Successfully added a new review');
        res.redirect(`/gyms/${gym._id}`);
    })
);

router.delete(
    '/:reviewID',
    catchAsync(async (req, res) => {
        const { id, reviewID } = req.params;

        await Gym.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
        await Review.findByIdAndDelete(reviewID);
        req.flash('error', 'Review deleted');
        res.redirect(`/gyms/${id}`);
    })
);

module.exports = router;
