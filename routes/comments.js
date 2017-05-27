var express = require('express');
var router = express.Router({mergeParams: true});
var middleware = require('../middleware');
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var flash = require('connect-flash');

///////////////////////////////////////
//COMMENTS ROUTES//////////////////////
///////////////////////////////////////

//NEW
router.get('/new', middleware.isLoggedIn, function(req, res) {
    //find campground by its id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            req.flash('error', 'Something went wrong. Could not complete your request.');
        } else {
            res.render('comments/new', {campground: campground});   
        }
    });
});

//CREATE
router.post('/', middleware.isLoggedIn, function(req, res) {
    //lookup correct campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash('error', 'Something went wrong. Could not find the campground you requested.');
            res.redirect('/campgrounds');
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                 if(err) {
                     console.log(err);
                 } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground show page
                    req.flash('success', 'Your comment has been submitted!');
                    res.redirect('/campgrounds/' + campground._id);
                 }
            });
            
        }
    });
    
});

//EDIT Route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            req.flash('error', 'Something went wrong. Could not comeplete your request.');
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});   
        }
    });
});

//UPDATE Route
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            req.flash('error', 'Something went wrong. Could not complete your request.');
            res.redirect('back');
        } else {
            req.flash('success', 'Your comment has been updated.');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//DESTROY Route
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect('back');
        } else {
            req.flash('success', 'Your comment has been deleted.');
            res.redirect('/campgrounds/' + req.params.id);
        } 
    });
});

module.exports = router;