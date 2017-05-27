var Campground = require('../models/campground');
var Comment = require('../models/comment');

////////////////////////////////////////////
//MIDDLEWARE////////////////////////////////
////////////////////////////////////////////

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    //Check whether user owns campground before editing/deleting
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                req.flash('error', 'Something went wrong. Campground not found.');
                res.redirect('back');
            } else {
                //Does the logged in user own the campground?
                if(foundCampground.author.id.equals(req.user._id)) { //.equals() is a Mongoose method for comparing the ids, which are NOT both of type String 
                    next();
                } else {
                    req.flash('error', 'You do not have the necessary permissions to modify this campground.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You must be logged in to use this feature.');
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    //Check whether user owns comment before editing/deleting
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                req.flash('error', 'Something went wrong. Comment not found.');
                res.redirect('back');
            } else {
                //Does the logged in user own the comment?
                if(foundComment.author.id.equals(req.user._id)) { //.equals() is a Mongoose method for comparing the ids, which are NOT both of type String 
                    next();
                } else {
                    req.flash('error', 'You do not have the necessary permissions to modify this comment.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You must be logged in to use this feature.');
        res.redirect('back');
    }
};

//Check whether user is logged in
middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.session.redirectTo = req.originalUrl;
    req.flash('error', 'You must be logged in to use this feature.'); //The flash message must go before the redirect
    res.redirect('/login');
};

module.exports = middlewareObj;