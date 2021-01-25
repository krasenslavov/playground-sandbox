const ErrorResponse = require('../utils/errorResponse');
// Load up the async handler middlerware.
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get all courses.
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  public
exports.getCourses = asyncHandler( async (req, res, next) => {

	// Used for /api/v1/courses
	// {{URL}}/api/v1/courses
	if (req.params.bootcampId) { 
		const courses = await Course.find( { bootcamp: req.params.bootcampId } );	
		return res.status(200).json({
			success: true,
			count: courses.length,
			data: courses
		});
	} else { 
		// Used for /api/v1/bootcamps/:bootcampId/courses
		// {{URL}}/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses
		// query = Course.find().populate({ 
		// 	path: 'bootcamp',
		// 	select: 'name description' // Have bootcamp data when with each coruse
		// });
		res.status(200).json(res.advancedResults);
	}
});

// @desc    Get a signle courses.
// @route   GET /api/v1/courses/:id
// @access  private
exports.getCourse = asyncHandler( async (req, res, next) => {

	const course = await Course.findById(req.params.id).populate({
		path: 'bootcamp',
		select: 'name description'
	});

	if (!course) {
		return next(new ErrorResponse(
			`Course not found with Id of ${req.params.id}`, 
			404
		));
	}

	res.status(200).json({ 
        success: true,
        data: course
    });
});

// @desc    Add new course.
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  private
exports.addCourse = asyncHandler( async (req, res, next) => {

	// Manually add to the body our Bootcamp assoc Id.
	req.body.bootcamp = req.params.bootcampId;
	req.body.user = req.user.id;

	const bootcamp = await Bootcamp.findById(req.params.bootcampId);
	
	if (!bootcamp) {
		return next(new ErrorResponse(
			`Bootcamp not found with Id of ${req.params.bootcampId}`, 
			404
		));
	}

	// Make sure user is a Bootcamp owner.
    if (bootcamp.user.toString() !== req.user.id
        && req.user.role !== 'admin') {
        return next(new ErrorResponse(
            `User ${req.user.id} is not authorized to add a course to ${bootcamp._id}.`, 
            401 
        ));
    }

	const course = await Course.create(req.body);

	res.status(200).json({ 
        success: true,
        data: course
    });
});

// @desc    Update course.
// @route   PUT /api/v1/courses/:id
// @access  private
exports.updateCourse = asyncHandler( async (req, res, next) => {

	let course = await Course.findById(req.params.id);
	
	if (!course) {
		return next(new ErrorResponse(
			`Course not found with Id of ${req.params.id}`, 
			404
		));
	}

	// Make sure user is a Course owner.
    if (course.user.toString() !== req.user.id
        && req.user.role !== 'admin') {
        return next(new ErrorResponse(
            `User ${req.user.id} is not authorized to update course ${course._id}.`, 
            401 
        ));
    }

	course = await Course.findByIdAndUpdate(req.params.id, req.body, { 
        new: true,
        runValidators: true
    });

	res.status(200).json({ 
        success: true,
        data: course
    });
});

// @desc    Delete course.
// @route   Delete /api/v1/courses/:id
// @access  private
exports.deleteCourse = asyncHandler( async (req, res, next) => {

	const course = await Course.findById(req.params.id);
	
	if (!course) {
		return next(new ErrorResponse(
			`Course not found with Id of ${req.params.id}`, 
			404
		));
	}

	// Make sure user is a Course owner.
    if (course.user.toString() !== req.user.id
        && req.user.role !== 'admin') {
        return next(new ErrorResponse(
            `User ${req.user.id} is not authorized to delete course ${course._id}.`, 
            401 
        ));
    }

	await course.remove();

	res.status(200).json({ 
        success: true,
        data: {}
    });
});