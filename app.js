var express = require('express');
var app = express();
//var jquery = require('jquery');
//var popper = require('popper.js');
//var tooltip = require('tooltip.js');
//var axios = require('axios');
//var $ = require('bootstrap');
var reload = require('reload');

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

app.listen(3000, function() {
    console.log('Movies App is Running on PORT 3000');
});