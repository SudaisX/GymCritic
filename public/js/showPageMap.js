mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: gym.geometry.coordinates, //[-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(gym.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({
            offset: 25,
        }).setHTML(`<h3>${gym.title}</h3><p>${gym.location}</p>`)
    )
    .addTo(map);
