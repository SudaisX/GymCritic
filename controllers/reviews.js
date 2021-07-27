const Gym = require('../models/gym');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const gym = await Gym.findById(req.params.id);
    const review = new Review(req.body);
    review.author = req.user._id;
    gym.reviews.push(review);
    await review.save();
    await gym.save();
    req.flash('success', 'Successfully added a new review');
    res.redirect(`/gyms/${gym._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewID } = req.params;

    await Gym.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
    await Review.findByIdAndDelete(reviewID);
    req.flash('error', 'Review deleted');
    res.redirect(`/gyms/${id}`);
};

module.exports.redirectBack = async (req, res) => {
    const gym = await Gym.findById(req.params.id);
    res.redirect(`/gyms/${gym._id}`);
};
