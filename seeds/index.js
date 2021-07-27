const mongoose = require('mongoose');
const cities = require('./cities');
const pkCities = require('./pkCities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/gym');

mongoose
    .connect('mongodb://localhost:27017/gym-critic', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('MongoDB Connection Open!'))
    .catch((err) => console.log('MongoDB Connection Failed..', err));

function randomName(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    // for (let city of cities) {
    //     const camp = new Campground({
    //         title: `${randomName(descriptors)} ${randomName(places)}`,
    //         location: `${city.city}, ${city.state}`,
    //         image: 'https://source.unsplash.com/collection/10857543',
    //         description:
    //             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque assumenda quia molestiae modi dolore voluptate ullam autem, suscipit fugit alias perspiciatis ex voluptates et esse. Unde repudiandae commodi praesentium! Nostrum, pariatur expedita repellendus nobis inventore, placeat suscipit eveniet sequi reiciendis sit ducimus omnis quidem alias repellat similique, ratione temporibus praesentium illum. Nam delectus voluptate officiis, saepe aut explicabo incidunt.',
    //         fee: Math.floor(Math.random() * 20) + 10,
    //     });
    //     await camp.save();
    // }
    for (let city of pkCities) {
        const camp = new Campground({
            title: `${randomName(descriptors)} ${randomName(places)}`,
            author: '60ffa1835a12362700b76d5c',
            location: `${city.city}, ${city.admin_name}`,
            image: 'https://source.unsplash.com/collection/10857543',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque assumenda quia molestiae modi dolore voluptate ullam autem, suscipit fugit alias perspiciatis ex voluptates et esse. Unde repudiandae commodi praesentium! Nostrum, pariatur expedita repellendus nobis inventore, placeat suscipit eveniet sequi reiciendis sit ducimus omnis quidem alias repellat similique, ratione temporibus praesentium illum. Nam delectus voluptate officiis, saepe aut explicabo incidunt.',
            fee: Math.floor(Math.random() * 5000) + 500,
        });
        await camp.save();
    }
};

seedDB().then(() => mongoose.connection.close());
