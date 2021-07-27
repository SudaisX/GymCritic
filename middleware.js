const { gymSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Gym = require('./models/gym');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
};

module.exports.validateGyms = (req, res, next) => {
    const { error } = gymSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/gyms/${id}`);
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};
