const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const GymSchema = new Schema({
    title: String,
    image: String,
    fee: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});

GymSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

module.exports = mongoose.model('Gym', GymSchema);
