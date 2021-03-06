const express = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const ApiError = require('./models/ApiError');
const cors = require('cors');
const moment = require('moment');
const authenticationRoutes = require('./routes/authenticationRoutes');
const showRoutes = require('./routes/showRoutes');
const roomRoutes = require('./routes/roomRoutes');
const movieRoutes = require('./routes/movieRoutes');
const auth = require('./utils/authentication');
const port = process.env.port || 12345;


 // connect to our database
mongoose.connect('mongodb://Jdeno:Biosappp2@ds245680.mlab.com:45680/biosappp2');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers: Authorization");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, x-access-token, Content-Type, Accept");
    next();
});

app.use(cors());
    
app.use(bodyParser.json());
app.use('*', function(req, res, next){
    next()
});

//Routes
app.use('/api', authenticationRoutes)

app.all('/api', auth.verifyToken);
app.use('/api', showRoutes);
app.use('/api', roomRoutes);
app.use('/api', movieRoutes);

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
app.listen(process.env.PORT || port);

module.exports = app;