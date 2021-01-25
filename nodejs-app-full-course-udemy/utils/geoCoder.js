// Using Node Geocoder with MapQuest to format model location values.

const dotenv = require('dotenv');
const NodeGeocoder = require('node-geocoder');

dotenv.config({ path: './config/config.env' });

const options = {
	provider: process.env.GEOCODER_PROVIDER,
	httpAdapter: 'https',
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null
};

const geoCoder = NodeGeocoder(options);

module.exports = geoCoder;