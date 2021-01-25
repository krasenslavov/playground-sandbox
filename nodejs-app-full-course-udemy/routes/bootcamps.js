// Creating routes with Express.

const express = require('express');
const router = express.Router();
const { 
	getBootcamps, 
	createBootcamp, 
	readBootcamp, 
	updateBootcamp, 
	deleteBootcamp,
	getBootcampsInRadius,
	uploadBootcampPhoto
} = require('../controllers/bootcamps');

// Wherever we use protect the User has to be logged in.
// Also, the role should be checked for authorization and access.
// authorize() must be set after protect.
const { protect, authorize } = require('../middleware/auth'); 

const Bootcamp = require('../models/Bootcamp');
// advancedResults middleware for handling, select, sort, filter etc...
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers.
const courseRouter = require('./courses');

// Re-route into other resource routers.
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance/:unit') 
	.get(getBootcampsInRadius);

router.route('/:id/photo')
	.put(protect, authorize('publisher', 'admin'), uploadBootcampPhoto)

router.route('/')
	.get(advancedResults(Bootcamp, 'course'), getBootcamps)
	.post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/:id')
	.get(readBootcamp)
	.put(protect, authorize('publisher', 'admin'), updateBootcamp)
	.delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

// Exporting the router
module.exports = router;