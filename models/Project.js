const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: String,
	description: String,
	author: String,
	pin: String,
	createdAt: { type: Date, default: Date.now },
	finishedAt: { type: Date },
	team: [String],
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
