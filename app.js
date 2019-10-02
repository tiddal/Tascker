const path = require('path'),
    env = require('dotenv').config(),  
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'), 
    methodOverride = require('method-override'),
    port = process.env.PORT || 3000,
    express = require('express'),
    app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('Landing');
});

app.listen(port, process.env.IP, () => {
    console.log(`Server running on port ${port}`);
});
