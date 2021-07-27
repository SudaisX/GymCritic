const Gym = require('../models/gym');

module.exports.index = async (req, res) => {
    const gyms = await Gym.find({});
    res.render('gyms/index', { gyms });
};

module.exports.renderNewForm = async (req, res) => {
    res.render('gyms/new');
};

module.exports.createNewGym = async (req, res, next) => {
    const gym = new Gym(req.body);
    gym.author = req.user._id;
    await gym.save();
    req.flash('success', 'Successfully made a new Gym');
    res.redirect(`/gyms/${gym._id}`);
};

module.exports.showGym = async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
            },
        })
        .populate('author');
    if (!gym) {
        req.flash('error', 'Cannot find that gym :(');
        return res.redirect('/gyms');
    }
    res.render('gyms/show', { gym });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym) {
        req.flash('error', 'Cannot find that gym :(');
        return res.redirect('/gyms');
    }
    res.render('gyms/edit', { gym });
};

module.exports.updateGym = async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findByIdAndUpdate(id, { ...req.body });
    req.flash('success', 'Successfully updated Gym');
    res.redirect(`/gyms/${gym._id}`);
};

module.exports.deleteGym = async (req, res) => {
    const { id } = req.params;
    await Gym.findByIdAndDelete(id);
    req.flash('error', 'Gym deleted');
    res.redirect('/gyms');
};
