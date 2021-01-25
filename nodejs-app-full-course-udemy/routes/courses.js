const express = require('express');
const router = express.Router({
	mergeParams: true // Coming from bootcamps.js
});
const { 
	getCourses,
	getCourse,
	addCourse,
	updateCourse,
	deleteCourse	
} = require('../controllers/courses');

const Course = require('../models/Course');
// advancedResults middleware for handling, select, sort, filter etc...
const advancedResults = require('../middleware/advancedResults');
// Wherever we use protect the User has to be logged in.
const { protect, authorize } = require('../middleware/auth'); 

router.route('/')
	.get(advancedResults(Course, { 
		path: 'bootcamp',
		select: 'name description' // Have bootcamp data assoc with each coruse.
	}), getCourses)
	.post(protect, authorize('publisher', 'admin'), addCourse);

router.route('/:id')
	.get(getCourse)
	.put(protect, authorize('publisher', 'admin'), updateCourse)
	.delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;