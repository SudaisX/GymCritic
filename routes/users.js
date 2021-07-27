const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const usersController = require('../controllers/users');

router.get('/register', usersController.renderRegister);

router.post('/register', catchAsync(usersController.register));

router.get('/login', usersController.renderLogin);

router.post(
    '/login',
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    usersController.login
);

router.get('/logout', usersController.logout);

module.exports = router;
