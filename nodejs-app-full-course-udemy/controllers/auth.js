const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc    Register user.
// @route   POST /api/v1/auth/register
// @access  public
exports.register = asyncHandler(async (req, res, next) => {
	const {name, email, password, role} = req.body;

	// Create new user.
	const user = await User.create({
		name, email, password, role
	});

	sendTokenResponse(user, 200, res);
});

// @desc    Login user.
// @route   POST /api/v1/auth/login
// @access  public
exports.login = asyncHandler(async (req, res, next) => {
	const {email, password} = req.body;

	// Validate email and password.
	if (!email || !password) {
		return next(new ErrorResponse(
            `Please provide an email and password.`, 
            400 
       ));
	}

	// Check for user.
	const user = await User.findOne({email: email}).select('+password');

	if (!user) {
		return next(new ErrorResponse(
            `Invalid email and/or password.`, 
            401 
       ));
	}

	// Check if entered password matches with DB password
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse(
            `Invalid email and/or password.`, 
            401 
       ));
	}

	sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user.
// @route   POST /api/v1/auth/me
// @access  private
exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		data: user
	});
});

// @desc    Update user details.
// @route   PUT /api/v1/auth/details
// @access  private
exports.updateDetails = asyncHandler(async (req, res, next) => {

	const fieldsToUpdate = {
		name: req.body.name,
		email: req.body.email
	};

	const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		success: true,
		data: user
	});
});

// @desc    Update user password.
// @route   PUT /api/v1/auth/updatepassword
// @access  private
exports.updatePassword = asyncHandler(async (req, res, next) => {

	const user = await User.findById(req.user.id).select('+password');

	// Check current password
	
	// Check if entered password matches with DB password
	if (!(await user.matchPassword(req.body.currentPassword))) {
		return next(new ErrorResponse(
            `User password is incorrect.`, 
            401 
       ));
	}

	user.password = req.body.newPassword;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// @desc    Forgot password.
// @route   POST /api/v1/auth/forgotpassword
// @access  public
exports.forgotPassword = asyncHandler(async (req, res, next) => {

	const user = await User.findOne({ 
		email: req.body.email 
	});

	if (!user) {
		return next(new ErrorResponse(
            `There is no user with that email.`, 
            404
       ));
	}

	// Get reset password token.
	const resetToken = user.getResetPasswordToken();

	await user.save({
		validateBeforeSave: false
	});

	// Create reset URL.
	const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to:\n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token.',
			message: message
		});

		res.status(200).json({
			success: true,
			data: 'Email sent.'
		});
	} catch (error) {

		// In development mode.
		// console.error(error);
		
		user.getResetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({
			validateBeforeSave: false
		});

		return next(new ErrorResponse(
            `Email could not be sent.`, 
            500
       	));
	}

	// In development mode.
	// console.log(resetToken);

	res.status(200).json({
		success: true,
		data: user
	});
});

// @desc    Reset password.
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token.
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

	const user = await User.findOne({
		resetPasswordToken: resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() }
	});

	if (!user) {
		return next(new ErrorResponse(
            `Invalid token.`, 
            400
       	));
	} 

	// Set the new password.
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
// Automatically add toke in Postman to 
// Tests and create env variable like so:
// pm.environment.set("TOKEN", pm.response.json().token);
const sendTokenResponse = (user, statusCode, res) => {
	// Create JWT token.
	const token = user.getSignedJWTToken();
	const options = {
		// In miliseconds
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true
	}

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res.status(statusCode)
		.cookie('token', token, options)
		.json({
			success: true,
			token: token
		});
};