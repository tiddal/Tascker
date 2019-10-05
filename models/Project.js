const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: { type: String, required: true, maxlength: 50 },
	description: { type: String, maxlength: 100 },
	author: { type: String, required: true, maxlength: 20 },
	pin: { type: String, required: true, maxlength: 10 },
	createdAt: { type: Date, default: Date.now },
	finishedAt: { type: Date, default: null },
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
	duration: { type: Number, default: 0 }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
