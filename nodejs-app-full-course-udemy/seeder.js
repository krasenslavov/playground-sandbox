const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({path: './config/config.env'});

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');

// Connect to DB.
connectDB();

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

// Import into Database.
const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);
		await Course.create(courses);
		await User.create(users);
		console.log('New data imported...'.green.inverse);
		process.exit(1);
	} catch (error) {
		console.error(error);
	}
}

// Delete data.
const deleteData = async () => {
	try {
		await Bootcamp.deleteMany();
		await Course.deleteMany();
		await User.deleteMany();
		console.log('All data deleted...'.red.inverse);
		process.exit(1);
	} catch (error) {
		console.error(error);
	}
}
// Add argument when call this script in the console.
if (process.argv[2] === '--data-import') {
	importData();
} else if (process.argv[2] === '--data-delete') {
	deleteData();
}