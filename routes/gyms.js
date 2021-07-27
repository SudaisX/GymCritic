const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Gym = require('../models/gym');
const { gymSchema } = require('../schemas.js');
const { isLoggedIn, isOwner, validateGyms } = require('../middleware');

const gymsController = require('../controllers/gyms');

router.get('/', gymsController.index);

router.get('/new', isLoggedIn, gymsController.renderNewForm);

router.post('/', isLoggedIn, validateGyms, catchAsync(gymsController.createNewGym));

router.get('/:id', catchAsync(gymsController.showGym));

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(gymsController.renderEditForm));

router.put('/:id', validateGyms, isLoggedIn, isOwner, catchAsync(gymsController.updateGym));

router.delete('/:id', isLoggedIn, isOwner, catchAsync(gymsController.deleteGym));

module.exports = router;
