const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	name: { type: String, required: true, maxlength: 50 },
	author: { type: String, required: true, maxlength: 20 },
	createdAt: { type: Date, default: Date.now },
	finishedAt: { type: Date, default: null },
	duration: { type: Number, default: 0 }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
