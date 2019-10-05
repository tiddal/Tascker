const express = require('express');
const router = express.Router({ mergeParams: true });

const Project = require('../models/Project');
const Task = require('../models/Task');

//  Projects ->  INDEX
router.get('/projects', (req, res) => {
	Project.find({}, (err, projects) => {
		err
			? console.log(err)
			: res.render('projects/Index', { projects: projects });
	});
});

//  Projects ->  NEW
router.get('/projects/new', (req, res) => {
	res.render('projects/New');
});

//  Projects ->  CREATE
router.post('/projects', (req, res) => {
	Project.create(req.body.project, (err, project) => {
		err
			? res.redirect('/projects/new')
			: res.redirect('/projects/' + project.id);
	});
});

//  Projects ->  SHOW
router.get('/projects/:id', (req, res) => {
	Project.findById(req.params.id)
		.populate('tasks')
		.exec((err, foundProject) => {
			err || !foundProject
				? res.redirect('/projects')
				: res.render('projects/Show', { project: foundProject });
		});
});

//  Projects ->  EDIT
router.get('/projects/:id/edit', (req, res) => {
	Project.findById(req.params.id, (err, foundProject) => {
		err || !foundProject
			? res.redirect('/projects')
			: res.render('projects/Edit', { project: foundProject });
	});
});

//  Projects ->  UPDATE
router.put('/projects/:id', (req, res) => {
	const pin = req.body.project.pin;
	const id = req.params.id;
	const query = { _id: id, pin: pin, finishedAt: null };
	const update = req.body.project;
	Project.findOneAndUpdate(query, update, (err, foundProject) => {
		err || !foundProject
			? res.redirect(`/projects/${id}/edit`)
			: res.redirect('/projects/' + id);
	});
});
router.patch('/projects/:id', (req, res) => {
	const pin = req.body.project.pin;
	const id = req.params.id;
	const query = { _id: id, pin: pin, finishedAt: null };
	Project.findOne(query, (err, foundProject) => {
		err || !foundProject
			? res.redirect(`/projects/${id}/edit#finish`)
			: Task.findOne(
					{ _id: { $in: foundProject.tasks }, finishedAt: null },
					(err, foundTask) => {
						err || foundTask
							? res.redirect('/projects/' + id)
							: ((foundProject.finishedAt = Date.now()),
							  foundProject.save(),
							  res.redirect('/projects/' + id));
					}
			  );
	});
});

//  Projects ->  DELETE
router.delete('/projects/:id', (req, res) => {
	const pin = req.body.project.pin;
	const id = req.params.id;
	const query = { _id: id, pin: pin };
	Project.findOneAndRemove(query, (err, foundProject) => {
		err || !foundProject
			? res.redirect(`/projects/${id}/edit#delete`)
			: Task.deleteMany({ _id: { $in: foundProject.tasks } }, (err) => {
					err
						? res.redirect(`/projects/${id}/edit#delete`)
						: res.redirect('/projects');
			  });
	});
});

module.exports = router;
