const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Gym = require('../models/gym');
const { gymSchema } = require('../schemas.js');
const { isLoggedIn, isOwner, validateGyms } = require('../middleware');

router.get('/', async (req, res) => {
    const gyms = await Gym.find({});
    res.render('gyms/index', { gyms });
});

router.get('/new', isLoggedIn, async (req, res) => {
    res.render('gyms/new');
});

router.post(
    '/',
    isLoggedIn,
    validateGyms,
    catchAsync(async (req, res, next) => {
        const gym = new Gym(req.body);
        gym.author = req.user._id;
        await gym.save();
        req.flash('success', 'Successfully made a new Gym');
        res.redirect(`/gyms/${gym._id}`);
    })
);

router.get(
    '/:id',
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const gym = await Gym.findById(id).populate('reviews').populate('author');
        if (!gym) {
            req.flash('error', 'Cannot find that gym :(');
            return res.redirect('/gyms');
        }
        res.render('gyms/show', { gym });
    })
);

router.get(
    '/:id/edit',
    isLoggedIn,
    isOwner,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const gym = await Gym.findById(id);
        if (!gym) {
            req.flash('error', 'Cannot find that gym :(');
            return res.redirect('/gyms');
        }
        res.render('gyms/edit', { gym });
    })
);

router.put(
    '/:id',
    validateGyms,
    isLoggedIn,
    isOwner,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const gym = await Gym.findByIdAndUpdate(id, { ...req.body });
        req.flash('success', 'Successfully updated Gym');
        res.redirect(`/gyms/${gym._id}`);
    })
);

router.delete(
    '/:id',
    isLoggedIn,
    isOwner,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Gym.findByIdAndDelete(id);
        req.flash('error', 'Gym deleted');
        res.redirect('/gyms');
    })
);

module.exports = router;
