const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: { type: String, required: true, maxlength: 50 },
	description: { type: String, maxlength: 100 },
	author: { type: String, required: true, maxlength: 15 },
	pin: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	finishedAt: { type: Date, default: null },
	team: [String],
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
