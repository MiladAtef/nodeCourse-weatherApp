const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');

const app = express();

//define paths for express config
const publicDirPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//serving the public directory.
app.use(express.static(publicDirPath));

//setting up express to use handlebars
app.set('view engine', 'hbs');

//customizing the views directory to name it whatever we want an put it wherever we want(we still naming it views but changed its path from the root to templates/views)
app.set('views', viewsPath);

//setup handlebars to use parials
hbs.registerPartials(partialsPath);

//setup the routes
app.get('', (req, res) => {
	//from the index.hbs
	//the second argument is an object contains the dynamic variable we can use in index.hbs
	res.render('index', {
		title: 'Weather',
		name: 'Milad Atef'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Milad Atef'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Milad Atef',
		helpText: 'this is some helpful text.'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'you must provide an address' });
	}

	geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
		if (err) {
			return res.send({ err });
		}
		forecast(latitude, longitude, (err, forecastData) => {
			if (err) {
				return res.send({ err });
			}
			res.send({
				address: req.query.address,
				forecast: forecastData,
				location
			});
		});
	});
});

//setup the 404 just for the route after help (ex:-  /help/anythingDoesntExist)
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404!',
		notFoundMessage: 'help article  not found',
		name: 'Milad Atef'
	});
});

//setup the 404 page, and it must be below all other routes
app.get('*', (req, res) => {
	res.render('404', {
		title: '404!',
		notFoundMessage: 'Page not found',
		name: 'Milad Atef'
	});
});

//set up the server port in the browser
app.listen(3000, () => {
	console.log('App is running on port 3000');
});
