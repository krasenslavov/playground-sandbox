// Examples and tests from the server.js file.

// Load middlewares.
const logger = require('./middleware/logger');

// Middleware example.
const logger = (req, res, next) => {
	req.hello = 'Hello, world!';
	console.log('Middleware ran.');
	next();
}
app.use(logger);

// Express examples.
app.get('/', (req, res) => { 
	res.send('<h1>Hello, from Express.</h1>');
	res.json({ name: 'Krasen' });
	res.sendStatus(400);
	res.status(400).json({ success: false });
	res.status(200).json({ success: true, data: { name: 'Krasen' } });
});