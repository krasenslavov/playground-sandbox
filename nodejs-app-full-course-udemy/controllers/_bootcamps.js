// With examples and different ways to hadler controllers.

const Bootcamp = require('../models/Bootcamp');
// Creating contollers for our routes.
const ErrorResponse = require('../utils/errorResponse');
// Load up the async handler middlerware.
const asyncHandler = require('../middleware/async');

// @desc    Get all bootcamps.
// @route   GET /api/v1/bootcamps
// @access  public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    // try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({ 
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });
    // } catch (error) {
        // next(error);
        // res.status(400).json({
        //  success: false
        // });
    // }
    // res.status(200).json({ 
    //  success: true,
    //  message: 'Show all Bootcamps.',
    //  // hello: req.hello
    // });
});

// @desc    Create new bootcamp.
// @route   POST /api/v1/bootcamps
// @access  private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // try {

    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ 
        success: true,
        data: bootcamp
    });

    // } catch (error) {
        // next(error);
        // res.status(400).json({
        //  success: false
        // });
    // }
    // console.log(req.body);
    // res.status(200).json({ 
    //  success: true, 
    //  message: 'Create new Bootcamp.' 
    // });
});

// @desc    Get single bootcamps.
// @route   GET /api/v1/bootcamps/:id
// @access  private
exports.readBootcamp = asyncHandler(async (req, res, next) => { 
    // try {

    // {{URL}}/api/v1/bootcamps/5e4991d6e8631a3bb4d8c408
    const bootcamp = await Bootcamp.findById(req.params.id); 
    if (! bootcamp) {
        // return next(error);
        return next(new ErrorResponse(
            `Bootcamp not found with Id of ${req.params.id}`, 
            404 
       ));
        // return res.status(400).json({
        //  success: false,
        //  data: 'Error! ID does not exist in DB.'
        // });
    }
    res.status(200).json({ 
        success: true,
        data: bootcamp
    });
    
    // } catch (error) {
        // next(error);
        // next(new ErrorResponse(`Bootcamp not found with Id of ${req.params.id}`, 404));
        // res.status(400).json({
        //  success: false,
        //  data: 'Error! ID has a wrong format.'
        // });
    // }
    // res.status(200).json({ 
    //  success: true, 
    //  message: `Display (read) bootcamp ${req.params.id}.` 
    // });
});

// @desc    Update bootcamp.
// @route   PUT /api/v1/bootcamps/:id
// @access  private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    // try {

    // {{URL}}/api/v1/bootcamps/5e4991d6e8631a3bb4d8c408
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { 
        new: true,
        runValidators: true
    }); 
    if (! bootcamp) {
        return next(new ErrorResponse(
            `Bootcamp not found with Id of ${req.params.id}`, 
            404 
       ));
        // return res.status(400).json({
        //  success: false,
        //  data: 'Error! ID does not exist.'
        // });
    }
    res.status(200).json({ 
        success: true,
        data: bootcamp
    });
    
    // } catch (error) {
        // next(error);
        // res.status(400).json({
        //  success: false,
        //  data: 'Error! ID wrong format.'
        // });
    // }
    // res.status(200).json({ 
    //  success: true, 
    //  message: `Update bootcamp ${req.params.id}.` 
    // });
});

// @desc    Delete bootcamp.
// @route   DELETE /api/v1/bootcamps/:id
// @access  private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    // try {

    // {{URL}}/api/v1/bootcamps/5e4991d6e8631a3bb4d8c408
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (! bootcamp) {
        return next(new ErrorResponse(
            `Bootcamp not found with Id of ${req.params.id}`, 
            404 
       ));
        // return res.status(400).json({
        //  success: false,
        //  data: 'Error! ID does not exist.'
        // });
    }
    res.status(200).json({ 
        success: true,
        data: {}
    });

    // } catch (error) {
        // next(error);
        // res.status(400).json({
        //  success: false,
        //  data: 'Error! ID wrong format.'
        // });
    // }
    // res.status(200).json({ 
    //  success: true, 
    //  message: `Delete bootcamp ${req.params.id}.` 
    // });
})