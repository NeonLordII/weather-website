const request = require('request');


const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/e33e1cba468ae7fc9478b7512fa75e0e/${lat},${long}?units=uk2`;
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) return callback('Couldn\'t connect to weather services. Please try again later :(', undefined);
        if(!body) return callback('Weather forcast request yielded no response. Please try again later.', undefined);
        if(body.error) return callback('No such coordinates. Location doesn\'t exsist', undefined);

        callback(undefined, {
            forecast: `${body.daily.data[0].summary}. It is currently ${Math.round(body.currently.temperature)} degrees celsius with a ${Math.round(body.currently.precipProbability)}% chance of rain`,
            highest: `The highest today is ${Math.round(body.daily.data[0].temperatureHigh)} celsius.`,
            lowest: `The lowest today is ${Math.round(body.daily.data[0].temperatureLow)} celsius.`
        
        });
    });
}

module.exports = forecast;