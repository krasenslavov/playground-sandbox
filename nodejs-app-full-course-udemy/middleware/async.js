// Middleware.

// @desc 	Async handler, used to replace controllers try/catch routine.
const asyncHandler = fn => (req, res, next) =>
	Promise.resolve(fn(req, res, next))
		.catch(next);

module.exports = asyncHandler;