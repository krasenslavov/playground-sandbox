const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
// Load up the async handler middlerware.
const asyncHandler = require('../middleware/async');
const geoCoder = require('../utils/geoCoder');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps.
// @route   GET /api/v1/bootcamps
// @access  public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Create new bootcamp.
// @route   POST /api/v1/bootcamps
// @access  private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user to req.body.
    req.body.user = req.user.id;

    // Check for published bootcamp.
    const publishedBootcamp = await Bootcamp.findOne({
        user: req.user.id
    });

    // If user is not admin they can only add 1 Bootcamp.
    if (publishedBootcamp 
        && req.user.role !== 'admin') {
        return next(new ErrorResponse(
            `The user with Id ${req.user.id} has already published a Bootcamp.`, 
            400
       ));
    }

    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ 
        success: true,
        data: bootcamp
    });
});

// @desc    Get single bootcamps.
// @route   GET /api/v1/bootcamps/:id
// @access  private
exports.readBootcamp = asyncHandler(async (req, res, next) => { 
    // {{URL}}/api/v1/bootcamps/5e4991d6e8631a3bb4d8c408
    const bootcamp = await Bootcamp.findById(req.params.id); 

    if (!bootcamp) {
        // return next(error);
        return next(new ErrorResponse(
            `Bootcamp not found with Id of ${req.params.id}`, 
            404 
       ));
    }
    
    res.status(200).json({ 
        success: true,
        data: bootcamp
    });
});

// @desc    Update bootcamp.
// @route   PUT /api/v1/bootcamps/:id
// @access  private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    // {{URL}}/api/v1/bootcamps/5e4991d6e8631a3bb4d8c408
    // const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { 
    //     new: true,
    //     runValidators: true
    // }); 
    let bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(
            `Bootcamp not found with Id of ${req.params.id}`, 
            404 
        ));
    }

    // Make sure user is a Bootcamp owner.
    if (bootcamp.user.toString() !== req.user.id
        && req.user.role !== 'admin') {
        return next(new ErrorResponse(
            `User ${req.user.id} is not authorized to update this Bootcamp.`, 
            401 
        ));
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { 
        new: true,
        runValidators: true
    });
    
    res.status(200).json({ 
        success: true,
        data: bootcamp
    });
});

// @desc    Delete bootcamp.
// @route   DELETE /api/v1/bootcamps/:id
// @access  private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    // {{URL}}/api/v1/bootcamps/5e4991d6e8631a3bb4d8c408
    // const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    // Used for cascade delete courses in Bootcamp.js
    const bootcamp = await Bootcamp.findById(req.params.id); 

    if (!bootcamp) {
        return next(new ErrorResponse(
            `Bootcamp not found with Id of ${req.params.id}`, 
            404 
       ));
    }

    // Make sure user is a Bootcamp owner.
    if (bootcamp.user.toString() !== req.user.id
        && req.user.role !== 'admin') {
        return next(new ErrorResponse(
            `User ${req.user.id} is not authorized to delete this Bootcamp.`, 
            401 
        ));
    }

    bootcamp.remove();

    res.status(200).json({ 
        success: true,
        data: {}
    });
});

// @desc    Get bootcamps within a radius.
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
// @access  private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    // {{URL}}/api/v1/bootcamps/60606/10/km
    const { zipcode, distance, unit } = req.params;

    // Get lat/long from geocoder
    const loc = await geoCoder.geocode(zipcode);
    const long = loc[0].longitude;
    const lat = loc[0].latitude;

    // Calculate radius using radians
    // Devide distance by the radius of the Earth
    // Earth Radius = 3,963mi / 6,378km

    let radius = -1;

    if (unit === 'km') {
        radius = distance / 6378;
    } else if (unit === 'mi') {
        radius = distance / 3963;
    }

    const bootcamps = await Bootcamp.find({
        location: { 
            $geoWithin: { 
                $centerSphere: [ [ long, lat ], radius ] 
            } 
        }
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});

// @desc    Upload photo for bootcamp.
// @route   PUT /api/v1/bootcamps/:id/photo
// @access  private
exports.uploadBootcampPhoto = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(
            `Bootcamp not found with Id of ${req.params.id}`, 
            404 
       ));
    }

    // Make sure user is a Bootcamp owner.
    if (bootcamp.user.toString() !== req.user.id
        && req.user.role !== 'admin') {
        return next(new ErrorResponse(
            `User ${req.user.id} is not authorized to update and upload a photo to this Bootcamp.`, 
            401 
        ));
    }

    if (!req.files) {
        return next(new ErrorResponse(
            `Please upload a file.`, 
            400
        ));
    }

    const file = req.files.file;

    // Make sure the image is photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(
            `Please upload an image file.`, 
            400
        ));
    }
    // Make sure that the size is <=1MB
    if (file.size > process.env.FILE_MAX_SIZE_UPLOAD) {
        return next(new ErrorResponse(
            `Please upload an image less than ${process.env.FILE_MAX_SIZE_UPLOAD}.`, 
            400
        ));
    }

    // Create unique file name
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    // Do the actual upload of the file.
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async error => {

        if (error) {
            return next(new ErrorResponse(
                `Please upload an image less than ${process.env.FILE_MAX_SIZE_UPLOAD}.`, 
                400
            ));
        }

        // Insert the file name into our Bootcamp database.
        await Bootcamp.findByIdAndUpdate(req.params.id, { 
            photo: file.name 
        });

        res.status(200).json({
            success: true,
            data: file.name
        });
    });

    // console.log(req.files.file);
});