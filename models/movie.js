const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title : {
        required: true,
        type: String
    },
    description : {
        required: true,
        type: String  
    },
    director : {
        required: true,
        type: String
    },
    writers : {
        required: true,
        type: String
    },
    imdbScore : {
        type: Number
    },
    length : {
        required: true,
        type: Number
    },
    shows : [{type: Schema.Types.ObjectId, ref: "Show"}] 
}, {versionKey : false});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;