const Room = require('../models/room');
const ApiError = require('../models/ApiError');
const assert = require('assert');
const Show = require('../models/show');
const Movie = require('../models/movie');

module.exports = {

    get(req, res, next){

        let room = req.query.room;

        if(room != undefined || room != null){
            Room.findOne({roomNumber: room}, (err, document) => {
                if(err){
                    next(new ApiError("Something went wrong!", 412));
                } else if (document == null) {
                    next(new ApiError("No rooms found!", 412));
                } else {
                    res.status(200).json(document);
                }
            });
        } else {
            Room.find({}).populate('shows').exec((err, document) => {
                if(err){
                    next(new ApiError("Something went wrong!", 412));
                } else if (document == null) {
                    next(new ApiError("No rooms found!", 412));
                } else {
                    res.status(200).json(document);
                }
            });
        }  
    },

    getById(req, res, next){
        const id = req.params.id;

        try {
            assert(id, 'id must be provided');
        } catch(err){
            next(new ApiError(err.message, 412));
        }

        Room.findById({_id: id}).populate('shows').exec((err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No rooms found!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    post(req, res, next) {
        const roomNumber = req.body.roomNumber;
        const seats = req.body.seats;
        const room = req.body;

        try {
            assert(roomNumber, 'roomNumber must be provided');
            assert(seats, 'seats must be provided');
        } catch (err){
            next(new ApiError(err.message, 412));
        }

        Room.create(room, (err, document) => {
            if(err) {
                next(new ApiError('Something went wrong!', 412));
            } else {
                res.status(200).json(document); 
            }
        });
    },

    put(req, res, next){
        const roomNumber = req.body.roomNumber;
        const seats = req.body.seats;
        const id = req.params.id;

        try {
            assert(roomNumber, 'roomNumber must be provided');
            assert(seats, 'seats must be provided');
            assert(id, 'id must be provided');
        } catch (err){
            next(new ApiError(err.message, 412));
        }

        Room.findByIdAndUpdate(id, { $set : {roomNumber : roomNumber, seats : seats}}, {new : true}, (err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    delete(req, res, next){
        const roomId = req.params.roomId;

        try {
            assert(roomId, 'roomId must be provided');
        } catch(err){
            next(new ApiError(err.message, 412));
        }

        Room.findByIdAndDelete({_id : roomId}, (err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null){
                next(new ApiError("No rooms found with the given id!", 412));
            } else {
                res.status(200).json(document);
            }
        })
    }
}