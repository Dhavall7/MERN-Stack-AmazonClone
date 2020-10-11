const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./Backend/routes');


//Setup Express App
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/amazonclone', { useNewUrlParser: true , useUnifiedTopology: true})
mongoose.Promise = global.Promise;

//app.use(express.static('public'));
//to parse the body with post method
app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

//to use the routes of express
app.use('/', routes);

//for error handling
app.use(function (err, req, res, next) {
    res.status(404).send({ error: err.message });
});

//listen for requests
app.listen(process.env.port || 4242, () => {
    console.log('server is running!!')
});;
