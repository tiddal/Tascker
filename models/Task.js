const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	name: { type: String, required: true, maxlength: 50 },
	author: { type: String, required: true, maxlength: 15 },
	createdAt: { type: Date, default: Date.now },
	finishedAt: { type: Date, default: null }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
