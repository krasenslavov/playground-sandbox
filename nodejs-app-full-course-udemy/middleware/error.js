// Middleware.

const ErrorResponse = require('../utils/errorResponse');

// @desc 	Error handler.
const errorHandler = (err, req, res, next) => {

	let error = { ...err };
		error.message = err.message;

	// Log to console for devlopment.
	console.log(err);
	// console.log(err.stack.red);
	// console.log(err.name.red);

	// Mongoose bad ObjectId.
	if (err.name === 'CastError') {
		const message = `Nothing found with Id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	} 
	
	// Mongoose validation error.
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map(val => val.message);
		error = new ErrorResponse(message, 400);
	}

	// Mongoose duplicate key.
	if (err.code === 11000) {
		const message = `Duplicate field value entered.`;
		error = new ErrorResponse(message, 400);
	}
	
	res.status(error.statusCode || 500).json({ 
		success: false,
		message: error.message || 'Server error.'
	});
}

module.exports = errorHandler;