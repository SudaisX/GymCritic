const mongoose = require('mongoose');
const cities = require('./cities');
const pkCities = require('./pkCities');
const { places, descriptors } = require('./seedHelpers');
const Gym = require('../models/gym');

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
    await Gym.deleteMany({});
    // for (let city of cities) {
    //     const gym = new Gym({
    //         title: `${randomName(descriptors)} ${randomName(places)}`,
    //         location: `${city.city}, ${city.state}`,
    //         image: 'https://source.unsplash.com/collection/10857543',
    //         description:
    //             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque assumenda quia molestiae modi dolore voluptate ullam autem, suscipit fugit alias perspiciatis ex voluptates et esse. Unde repudiandae commodi praesentium! Nostrum, pariatur expedita repellendus nobis inventore, placeat suscipit eveniet sequi reiciendis sit ducimus omnis quidem alias repellat similique, ratione temporibus praesentium illum. Nam delectus voluptate officiis, saepe aut explicabo incidunt.',
    //         fee: Math.floor(Math.random() * 20) + 10,
    //     });
    //     await gym.save();
    // }
    for (let city of pkCities) {
        const gym = new Gym({
            title: `${randomName(descriptors)} ${randomName(places)}`,
            author: '610139159e4b5208f45f094a', // YOUR USER ID
            location: `${city.city}, ${city.admin_name}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/sudais/image/upload/v1627396068/GymCritic/hztsrt7xvn3lchzb3lfe.jpg',
                    filename: 'GymCritic/hztsrt7xvn3lchzb3lfe',
                },
                {
                    url: 'https://res.cloudinary.com/sudais/image/upload/v1627396069/GymCritic/if6buejioddyc1o6s3bt.jpg',
                    filename: 'GymCritic/if6buejioddyc1o6s3bt',
                },
                {
                    url: 'https://res.cloudinary.com/sudais/image/upload/v1627396070/GymCritic/hriwp1ptnzkdpis5ryf8.jpg',
                    filename: 'GymCritic/hriwp1ptnzkdpis5ryf8',
                },
            ],
            geometry: {
                type: 'Point',
                coordinates: [city.lng, city.lat],
            },
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque assumenda quia molestiae modi dolore voluptate ullam autem, suscipit fugit alias perspiciatis ex voluptates et esse. Unde repudiandae commodi praesentium! Nostrum, pariatur expedita repellendus nobis inventore, placeat suscipit eveniet sequi reiciendis sit ducimus omnis quidem alias repellat similique, ratione temporibus praesentium illum. Nam delectus voluptate officiis, saepe aut explicabo incidunt.',
            fee: Math.floor(Math.random() * 5000) + 500,
        });
        await gym.save();
    }
};

seedDB().then(() => mongoose.connection.close());
