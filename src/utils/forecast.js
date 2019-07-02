const request = require('request');

const forecast = (lat, long, callback) => {
	const url = `https://api.darksky.net/forecast/560d92aec5ae8389bd3a94b9c43fd5a8/${lat},${long}`;

	request({ url, json: true }, (err, resp) => {
		if (err) {
			callback('Unable to connect to the weather service', undefined);
		} else if (resp.body.error) {
			//this is if there is an error in the url, the api will respond with response that has an error property
			callback('unable to find location', undefined);
		} else {
			callback(
				undefined,
				`${resp.body.daily.data[0].summary} It is currently ${
					resp.body.currently.temperature
				} degrees out. there is a ${
					resp.body.currently.precipProbability
				}% chance of rain.`
			);
		}
	});
};

module.exports = forecast;
