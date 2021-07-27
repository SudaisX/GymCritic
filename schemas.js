const Joi = require('joi');

module.exports.gymSchema = Joi.object({
    title: Joi.string().required(),
    fee: Joi.number().required().min(0),
    image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required(),
});