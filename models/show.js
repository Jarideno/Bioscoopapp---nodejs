const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
    movie: {
        required: true,
        type: String
    },
    date : {
        required: true,
        type: Date
    },
    room: {type: Schema.Types.ObjectId, ref: "Room"}
}, {versionKey : false});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;