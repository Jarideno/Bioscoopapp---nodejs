const User = require('../models/user');
const ApiError = require('../models/ApiError');
const assert = require('assert');

module.exports = {

    register(req, res, next){
        const username = req.body.username;
        const password = req.body.password;
        const user = req.body;

        try {
            assert(username, 'username must be provided');
            assert(password, 'password must be provided');
        } catch(err) {
            next(new ApiError(err.message, 422));
        }

        User.create(user, (err) => {
            if(err){
                next(new ApiError("One or more properties were invalid.", 412));
            } else {
                res.status(200).json(user);
            }
        });
    },

    login(req, res, next){
        const username = req.body.username;
        const password = req.body.password;
        const user = req.body;

        try {
            assert(username, 'username must be provided');
            assert(password, 'password must be provided');
        } catch(err) {
            next(new ApiError(err.message, 422));
        }

        User.findOne({username: user.username, password: user.password}, (err, document) => {
            if(err){
                next(new ApiError("Unknown error! Please contact us.", 409));
            } else if(document == null){
                next(new ApiError("Wrong combination of username and password.", 401));
            } else {
                res.status(200).json(document);
            }
        });
    },

    put(req, res, next){
        const username = req.body.username;
        const password = req.body.password;
        const newPassword = req.body.newPassword;

        try {
            assert(username, 'username must be provided');
            assert(password, 'password must be provided');
            assert(newPassword, 'newPassword must be provided');
        } catch(err) {
            next(new ApiError(err.message, 422));
        }

        User.findOneAndUpdate({username: username, password: password}, {$set : {"password" : newPassword}}, {new: true}, (err, document) => {
            if(err){
                next(new ApiError("Unknown error! Please contact us.", 409));
            } else if(document == null){
                next(new ApiError("Wrong combination of username and password.", 401));
            } else {
                res.status(200).json(document);
            }
        });
    },

    delete(req, res, next){
        const username = req.body.username;
        const password = req.body.password;

        try {
            assert(username, 'username must be provided');
            assert(password, 'password must be provided');
        } catch(err) {
            next(new ApiError(err.message, 422));
        }
        
        User.findOneAndDelete({username: username, password: password}, (err, document) => {
            if(err){
                next(new ApiError("Unknown error! Please contact us."), 409);
            } else if(document == null){
                next(new ApiError("Wrong combination of username and password.", 401));
            } else {
                res.status(200).json(document);
            }
        });
    }
};