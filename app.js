var express = require('express');
var app = express();
//var jquery = require('jquery');
//var popper = require('popper.js');
//var tooltip = require('tooltip.js');
//var axios = require('axios');
//var $ = require('bootstrap');
var reload = require('reload');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/movie', function(req, res) {
    res.render('movie');
});


// Reload code here
reload(app);

app.listen(port, function() {
    console.log('Movies App is Running on PORT: ' + port);
});