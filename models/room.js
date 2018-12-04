const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomNumber : {
        required: true,
        type: Number
    },
    seats : {
        required: true,
        type: Number
    },
    shows : [{type: Schema.Types.ObjectId, ref: "Show"}]
}, {versionKey : false});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;