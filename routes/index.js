const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
	res.render('Landing');
});

router.get('*', (req, res) => {
	res.render('Landing');
});

module.exports = router;
