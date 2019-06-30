// Main vars
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Creats a new express object
const port = process.env.PORT || 3000;
const app = express();

// Define paths for express' config
const publicPath = path.join(__dirname, '../public');
const tempPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', tempPath)
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicPath));


// Pages    
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Principality'
    });
});





app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address was provided. Please provide an address and try again'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) return res.send({ error: error });
        forecast(latitude, longitude, (error, { forecast, highest, lowest, }) => {
            if(error) return res.send({ error: error });

            res.send({
                forecast,
                lowest,
                highest,
                location,
                address: req.query.address
            })

        });
    });

});



app.get('*', (req, res) => {
    res.render('404', {
        title: '404: Couldn\'t find page'
    });
});




app.listen(port, () => {
    console.log('Server is up at port 3000')
});