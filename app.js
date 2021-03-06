var util = require('util');
//MEAN Stack setup files
var mongoose = require('mongoose');
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//config
var database = require('./config/database');
mongoose.connect(database.url); // connect to our database

app.use(express.static(__dirname + '/public')); // set the static files location /public/img
app.use(morgan('dev'));  // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));  // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //parse app/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node app)
app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");


//setup database variables
var myvalue = mongoose.model('myvalue', { 
    SensorID: String,
    SensorTime: String,
    SensorVal: Number
}); 
 
//Read from DB
app.get('/api/myvalues', function(req, res) { //print values to webpage
    myvalue.find(function (err, myvalues) {
        if (err) res.send(err);
        res.json(myvalues); // return all myvalues in JSON format
    });
});    


// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

