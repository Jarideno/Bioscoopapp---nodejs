const Movie = require('../models/movie');
const ApiError = require('../models/ApiError');
const assert = require('assert');

module.exports = {

    get(req, res, next) {
        Movie.find({}).populate('shows').exec((err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No movies found!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    getById(req, res, next) {
        const id = req.params.id;

        try {
            assert(id, 'id must be provided');
        } catch(err){
            next(new ApiError(err.message, 412));
        }

        Movie.findById({_id: id}).populate('shows').exec((err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No movies found!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    getByMovieTitle(req, res, next){
        const title = req.params.title;

        try {
            assert(title, 'title must be provided');
        } catch(err){
            next(new ApiError(err.message, 412));
        }

        Movie.findOne({title: title}, (err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No movies found!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    post(req, res, next) {
        const title = req.body.title;
        const description = req.body.description;
        const director = req.body.director;
        const writers = req.body.writers;
        const imdbScore = req.body.imdbScore;
        const length = req.body.length;
        const movie = req.body;

        try {
            assert(title, 'title must be provided');
            assert(description, 'description must be provided');
            assert(director, 'director must be provided');
            assert(writers, 'writers must be provided');
            assert(imdbScore, 'imdbScore must be provided');
            assert(length, 'length must be provided');
        } catch(err){   
            next(new ApiError(err.message, 412));
        }

        Movie.create(movie, (err, document) => {
            if(err){
                next(new ApiError('Something went wrong!', 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    put(req, res, next) {
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const director = req.body.director;
        const writers = req.body.writers;
        const imdbScore = req.body.imdbScore;
        const length = req.body.length;

        try {
            assert(title, 'title must be provided');
            assert(description, 'description must be provided');
            assert(director, 'director must be provided');
            assert(writers, 'writers must be provided');
            assert(imdbScore, 'imdbScore must be provided');
            assert(length, 'length must be provided');
        } catch(err){   
            next(new ApiError(err.message, 412));
        }

        Movie.findByIdAndUpdate(id, { $set: {title : title, description : description, director : director, writers : writers, imdbScore : imdbScore, length : length}}, {new : true}, (err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No movie found with the given id!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    },

    delete(req, res, next){
        const id = req.params.id;

        try {
            assert(id, 'id must be provided');
        } catch (err) { 
            next(new ApiError(err.message, 412));
        }

        Movie.findByIdAndDelete({_id : id}, (err, document) => {
            if(err){
                next(new ApiError("Something went wrong!", 412));
            } else if (document == null) {
                next(new ApiError("No movies found with the given id!", 412));
            } else {
                res.status(200).json(document);
            }
        });
    }
}