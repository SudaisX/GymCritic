const express = require('express');
const router = express.Router();
const multer = require('multer');

const { storage } = require('../cloudinary');
const upload = multer({ storage });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Gym = require('../models/gym');
const { gymSchema } = require('../schemas.js');
const { isLoggedIn, isOwner, validateGyms } = require('../middleware');

const gymsController = require('../controllers/gyms');

router.get('/', gymsController.index);

router.get('/new', isLoggedIn, gymsController.renderNewForm);

router.post('/', isLoggedIn, upload.array('image'), validateGyms, catchAsync(gymsController.createNewGym));
// router.post('/', , (req, res) => {
//     console.log(req.body, req.files);
//     res.send('it worked');
// });

router.get('/:id', catchAsync(gymsController.showGym));

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(gymsController.renderEditForm));

router.put('/:id', isLoggedIn, isOwner, upload.array('image'), validateGyms, catchAsync(gymsController.updateGym));

router.delete('/:id', isLoggedIn, isOwner, catchAsync(gymsController.deleteGym));

module.exports = router;
