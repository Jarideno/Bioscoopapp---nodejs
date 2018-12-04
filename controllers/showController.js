const Show = require('../models/show');
const ApiError = require('../models/ApiError');
const assert = require('assert');
const Movie = require('../models/movie');
const Room = require('../models/room');

module.exports = {

    get(req, res, next){
        Show.find({}, (err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No shows found!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    getById(req, res, next){
        const id = req.params.id;

        try {
            assert(id, 'id must be provided');
        } catch(err){
            next(new ApiError(err.message, 412));
        }

        Show.findById({_id: id}, (err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No shows found!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    post(req, res, next){
        const movie = req.body.movie;
        const date = req.body.date;
        const show = req.body;
        const movieId = req.params.id;
        const roomId = req.params.roomId;

        try {
            assert(movie, 'movie must be provided');
            assert(date, 'date must be provided');
            assert(movieId, 'movieId must be provided');
            assert(roomId)
        } catch(err) {
            next(new ApiError(err.message, 412));
        }

        Show.create(show, (err, document) => {
            if(err){
                next(new ApiError('Something went wrong!', 412));
            } else {
                Movie.findById({_id : movieId}, (err, movie) => {
                    if(err){
                        next(new ApiError('Something went wrong!', 412));  
                    } else {
                        movie.shows.push(document);
                        movie.save();
                        Room.findById({_id : roomId}, (err, room) => {
                            if(err){
                                next(new ApiError('Something went wrong!', 412));
                            } else {
                                room.shows.push(document);
                                room.save();
                                Show.findByIdAndUpdate({_id : document._id}, { $set: {room : room.roomNumber}}, (err, result) => {
                                    if(err){
                                        next(new ApiError('Something went wrong!', 412));
                                    } else {
                                        res.status(200).json(document);
                                    }
                                })
                            }
                        })
                    }   
                });
            }
        });
    },

    put(req, res, next){
        const movie = req.body.movie;
        const date = req.body.date;
        const id = req.params.id;

        try {
            assert(id, 'id must be provided');
            assert(movie, 'movie must be provided');
            assert(date, 'date must be provided');
        } catch(err) {
            next(new ApiError(err.message, 412));
        }

        Show.findByIdAndUpdate(id, { $set: {movie : movie, date : date}}, {new : true}, (err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No show found with the given id!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    delete(req, res , next){
        const showId = req.params.showId;
        const movieId = req.params.movieId;
        const roomId = req.params.roomId;

        try {
            assert(showId, 'showId must be provided');
            assert(movieId, 'movieId must be provided');
        } catch (err) { 
            next(new ApiError(err.message, 412));
        }

        Show.findByIdAndDelete({_id : showId}, (err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No shows found with the given id!", 412));
            } else {
                Movie.findById({_id : movieId}, (err, movie) => {
                    if(err){
                        next(new ApiError("Something went wrong!", 412));
                    } else {
                        movie.shows.splice(movie.shows.indexOf(document), 1);
                        movie.save();
                        Room.findById({_id : roomId}, (err, room) => {
                            if(err){
                                next(new ApiError("Something went wrong!", 412));
                            } else {
                                room.shows.splice(room.shows.indexOf(room), 1);
                                room.save();
                                res.status(200).json(document);
                            }
                        })
                    }
                });
            }
        });
    }
}