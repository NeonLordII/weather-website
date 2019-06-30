const request = require('request');


const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/e33e1cba468ae7fc9478b7512fa75e0e/${lat},${long}?units=uk2`;
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) return callback('Couldn\'t connect to weather services. Please try again later :(', undefined);
        if(!body) return callback('Weather forcast request yielded no response. Please try again later.', undefined);
        if(body.error) return callback('No such coordinates. Location doesn\'t exsist', undefined);

        callback(undefined, `${body.daily.data[0].summary} It is currently ${Math.round(body.currently.temperature)} degrees with a ${Math.round(body.currently.precipProbability)}% chance of rain`);
    });
}

module.exports = forecast;