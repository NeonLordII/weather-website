const request = require('request');


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicHJpbmNpcGFsaXR5IiwiYSI6ImNqeDljYjlwMTBrcmM0M3Q4cmduMXZqbXAifQ.VMYobrnGd0qpbUA8EPzRVQ&limit=1`;
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) return callback('Couldn\'t connect to location services :(', undefined);
        if(!body.features[0]) return callback('Couldn\'t find the location you were looking for', undefined);

        callback(undefined, {
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
        });
    });
}

module.exports = geocode; 