const Gym = require('../models/gym');
const { cloudinary } = require('../cloudinary');

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
    const gyms = await Gym.find({});
    res.render('gyms/index', { gyms });
};

module.exports.renderNewForm = async (req, res) => {
    res.render('gyms/new');
};

module.exports.createNewGym = async (req, res, next) => {
    const geoData = await geocoder
        .forwardGeocode({
            query: req.body.location,
            limit: 1,
        })
        .send();
    const gym = new Gym(req.body);
    gym.geometry = geoData.body.features[0].geometry;
    gym.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    gym.author = req.user._id;
    await gym.save();
    // console.log(gym);
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
    console.log(req.body);
    const gym = await Gym.findByIdAndUpdate(id, { ...req.body });
    const images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    gym.images.push(...images);
    await gym.save();

    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await gym.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }

    req.flash('success', 'Successfully updated Gym');
    res.redirect(`/gyms/${gym._id}`);
};

module.exports.deleteGym = async (req, res) => {
    const { id } = req.params;
    await Gym.findByIdAndDelete(id);
    req.flash('error', 'Gym deleted');
    res.redirect('/gyms');
};
