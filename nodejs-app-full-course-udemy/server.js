/// !!! KEEP IN MIND. The order in the server.js is important !!!
/// !!! Sometimes stuff breaks if the order is wrong !!!

// Load path module.
const path = require('path');
// Load express.
const express = require('express');
// Load dotenv for configuration env file.
const dotenv = require('dotenv');
// Load colors for console output styling.
const colors = require('colors');
// Load morgan middleware.
const morgan = require('morgan');
// Load express file upload  middleware.
const fileupload = require('express-fileupload');
// Load cookie-parser for storing JWT string as cookie.
const cookieParser = require('cookie-parser');

// Load erorr handler middleware.
const errorHandler = require('./middleware/error');

// Route files.
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const users = require('./routes/users');
const auth = require('./routes/auth');

// Load ENV vars.
dotenv.config({ path: './config/config.env' });

// Load database config file.
const connectDB = require('./config/db');

// Initialize App.
const app = express();
const PORT = process.env.PORT || 5000; // from config.env

// Body parser.
app.use(express.json());

// Cookie parser.
app.use(cookieParser());

// Connect to DB.
connectDB();

// Development logger middleware.
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev')) ;
}

// File upload middlelware.
app.use(fileupload());

// Set ./public as a static folder.
// http://localhost:5000/uploads/photo_5d725a037b292f5f8ceff787.jpg
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers.
app.use('/api/v1/bootcamps', bootcamps); 
app.use('/api/v1/courses', courses); 
app.use('/api/v1/users', users); 
app.use('/api/v1/auth', auth); 

// Error handler middlelware.
app.use(errorHandler);

// Start app server with listener.
const server = app.listen(
	PORT, 
	console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold 
));

// Handle unhandled promise rejections.
process.on('unhandledRejection', (error, promise) => {
	console.log(`Unhandled rejection error: ${error.message}`.red.bold);
	// Close server and exit the process.
	server.close(() => { 
		process.exit(1);
	});
});