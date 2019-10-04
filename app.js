const path = require('path'),
	env = require('dotenv').config(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	port = process.env.PORT || 3000,
	express = require('express'),
	app = express(),
	moment = require('moment');

mongoose
	.connect(process.env.DBURL, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Successfully connected to the database');
	})
	.catch((err) => {
		console.log(`Failed to connect to the database: ${err.message}`);
	});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

moment.locale('pt');
app.locals.moment = moment;

app.get('/', (req, res) => {
	res.render('Landing');
});

app.listen(port, process.env.IP, () => {
	console.log(`Server running on port ${port}`);
});

const projectRoutes = require('./routes/projects');
app.use(projectRoutes);
