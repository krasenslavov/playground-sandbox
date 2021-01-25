const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please add a course title.']
	},
	description: {
		type: String,
		required: [true, 'Please add a description.']
	},
	weeks: {
		type: String,
		required: [true, 'Please add number of weeks.']
	},
	tuition: {
		type: Number,
		required: [true, 'Please add a tuition cost.']
	},
	minimumSkill: {
		type: String,
		required: [true, 'Please add a minimum skill.'],
		enum: ['beginner', 'intermediate', 'advanced']
	},
	scholarshipAvailable: {
		type: Boolean,
		deafult: false
	},
	bootcamp: { // relationship Object Id
		type: mongoose.Schema.ObjectId,
		ref: 'Bootcamp',
		required: true
	},
	user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Create a static method (for CourseSchema) to get the Average Cost of course tuitions.
CourseSchema.statics.getAverageCost = async function(bootcampId) {
	const oAggregated = await this.aggregate([
		{ $match: { bootcamp: bootcampId } },
		{
			$group: {
				_id: '$bootcamp',
				averageCost: { $avg: '$tuition' }
			}
		}
	]);
	// console.log(`Calculating average cost... ${obj}`.blue);
	// [ { _id: 5d725a037b292f5f8ceff787, averageCost: 4250 } ]
	// Adding the calculated Average Cost into our Database.
	try {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageCost: Math.ceil(oAggregated[0].averageCost / 10) * 10
		});
	} catch (error) {
		console.log(error);
	}
}

// Call the getAverageCost static method after save.
CourseSchema.post('save', function(next) {
	this.constructor.getAverageCost(this.bootcamp);
});

// Call the getAverageCost static method before remove.
CourseSchema.pre('remove', function(next) {
	this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);