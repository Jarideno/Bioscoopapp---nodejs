const express = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const ApiError = require('./models/ApiError');
const moment = require('moment');
const userRoutes = require('./routes/userRoutes');
const showRoutes = require('./routes/showRoutes');
const roomRoutes = require('./routes/roomRoutes');
const movieRoutes = require('./routes/movieRoutes');
const port = process.env.port || 3000;


 // connect to our database
mongoose.connect('mongodb://Jdeno:Biosappp2@ds245680.mlab.com:45680/biosappp2');

const app = express();
app.use(bodyParser.json());
app.use('*', function(req, res, next){
    next()
});

//Routes
app.use('/api', userRoutes);
//app.use('/api', showRoutes);
//app.use('/api', roomRoutes);
//app.use('/api', movieRoutes);

//Error handling
app.use('*', function (req, res, next) {
    console.log('De endpoint die je zocht bestaat niet');
    next(new ApiError("Invalid url", 400));
});

app.use((err, req, res, next) => {
    if(err) {
        res.status(err.code || 400).json({
            message: err.message || "unknown error",
            code: err.code,
            datetime: err.datetime || moment()
        }).end();
    } else {
        res.status(500).json({
            message: "unknown error",
            code: 500,
            datetime: moment()
        }).end();
    }
});

//Start server
app.listen(port, () => {
    console.log(`Web server listening on: ${port}`);
});

module.exports = app;