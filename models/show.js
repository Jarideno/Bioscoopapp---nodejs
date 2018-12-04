const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
    movie: {
        required: true,
        type: String
    },
    date : {
        required: true,
        type: String
    },
    room: {
        type: Number
    }
}, {versionKey : false});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;