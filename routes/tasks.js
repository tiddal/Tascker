//  Requirements
const express = require('express');
const router = express.Router({ mergeParams: true });

//  Models
const Project = require('../models/Project');
const Task = require('../models/Task');

//  Tasks ->  NEW
router.get('/projects/:id/tasks/new', (req, res) => {
	Project.findById(req.params.id, (err, foundProject) => {
		err || !foundProject
			? res.redirect('/projects')
			: res.render('tasks/New', { project: foundProject });
	});
});

//  Tasks ->  CREATE
router.post('/projects/:id/tasks', (req, res) => {
	const id = req.params.id;
	const pin = req.body.project.pin;
	const query = { _id: id, pin: pin, finishedAt: null };
	Project.findOne(query, (err, foundProject) => {
		err || !foundProject
			? res.redirect(`/projects/${id}/tasks/new`)
			: Task.create(req.body.task, (err, task) => {
					err
						? res.redirect(`/projects/${id}/tasks/new`)
						: (foundProject.tasks.push(task),
						  foundProject.save(),
						  res.redirect('/projects/' + id));
			  });
	});
});

//  Tasks ->  EDIT
router.get('/projects/:id/tasks/:task_id/edit', (req, res) => {
	const taskId = req.params.task_id;
	const projectId = req.params.id;
	const projectQuery = { _id: projectId, finishedAt: null };
	const taskQuery = { _id: taskId, finishedAt: null };
	Project.findOne(projectQuery, (err, foundProject) => {
		err || !foundProject
			? res.redirect('/projects')
			: Task.findOne(taskQuery, (err, foundTask) => {
					err || !foundTask
						? res.redirect('/projects')
						: res.render('tasks/Edit', {
								task: foundTask,
								project: foundProject
						  });
			  });
	});
});

//  Tasks ->  UPDATE
router.put('/projects/:id/tasks/:task_id', (req, res) => {
	const taskId = req.params.task_id;
	const projectId = req.params.id;
	const pin = req.body.project.pin;
	const projectQuery = { _id: projectId, pin: pin, finishedAt: null };
	const taskQuery = { _id: taskId, finishedAt: null };
	const update = req.body.task;

	Project.findOne(projectQuery, (err, foundProject) => {
		err || !foundProject
			? res.redirect(`/projects/${projectId}/tasks/${taskId}/edit#edit`)
			: Task.findOneAndUpdate(taskQuery, update, (err, foundTask) => {
					err || !foundTask
						? res.redirect('/projects')
						: res.redirect('/projects/' + projectId);
			  });
	});
});
router.patch('/projects/:id/tasks/:task_id', (req, res) => {
	const taskId = req.params.task_id;
	const projectId = req.params.id;
	const pin = req.body.project.pin;
	const projectQuery = { _id: projectId, pin: pin, finishedAt: null };
	const taskQuery = { _id: taskId, finishedAt: null };
	const update = { finishedAt: Date.now() };

	Project.findOne(projectQuery, (err, foundProject) => {
		err || !foundProject
			? res.redirect(`/projects/${projectId}/tasks/${taskId}/edit`)
			: Task.findOne(taskQuery, (err, foundTask) => {
					err || !foundTask
						? res.redirect('/projects')
						: ((foundTask.finishedAt = Date.now()),
						  (foundTask.duration = foundTask.finishedAt - foundTask.createdAt),
						  foundTask.save(),
						  (foundProject.duration += foundTask.duration),
						  foundProject.save(),
						  res.redirect('/projects/' + projectId));
			  });
	});
});

//  Tasks ->  DELETE
router.delete('/projects/:id/tasks/:task_id', (req, res) => {
	const taskId = req.params.task_id;
	const projectId = req.params.id;
	const pin = req.body.project.pin;
	const projectQuery = { _id: projectId, pin: pin, finishedAt: null };
	const taskQuery = { _id: taskId, finishedAt: null };

	Project.findOne(projectQuery, (err, foundProject) => {
		err || !foundProject
			? res.redirect(`/projects/${projectId}/tasks/${taskId}/edit#delete`)
			: Task.findOneAndRemove(taskQuery, (err, foundTask) => {
					err || !foundTask
						? res.redirect('/projects')
						: res.redirect('/projects/' + projectId);
			  });
	});
});

module.exports = router;
