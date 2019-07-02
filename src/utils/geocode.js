const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoibWlsYWRhdGVmIiwiYSI6ImNqc3JlaGo1eDBvOWQ0NXBoMnlrcmptNWMifQ.dg3iDx16QdfAy3TsPg5MyA&limit=1`;

	request({ url, json: true }, (err, resp) => {
		if (err) {
			callback('Unable to connect to the weather service', undefined);
		} else if (resp.body.features.length === 0) {
			callback('unable to find location, try another search', undefined);
		} else {
			callback(undefined, {
				longitude: resp.body.features[0].center[0],
				latitude: resp.body.features[0].center[1],
				location: resp.body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
