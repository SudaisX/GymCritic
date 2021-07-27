const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post(
    '/register',
    catchAsync(async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ username, email });
            const newUser = await User.register(user, password);
            req.login(newUser, (err) => {
                if (err) return next(err);
                req.flash('success', 'Welcome to GymCritic');
                res.redirect('/gyms');
            });
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('register');
        }
    })
);

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back! ');
    const redirectUrl = req.session.returnTo || '/gyms';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully Logged out');
    res.redirect('/gyms');
});

module.exports = router;
