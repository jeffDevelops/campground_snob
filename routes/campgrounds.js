var express = require('express');
var router = express.Router();
var middleware = require('../middleware')
var Campground = require('../models/campground');
var flash = require('connect-flash');

///////////////////////////////////////
//CAMPGROUNDS ROUTES///////////////////
///////////////////////////////////////

//INDEX Route
router.get('/', function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user}); 
        }
    });
});

//NEW Route
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');  
});

//CREATE Route
router.post('/', middleware.isLoggedIn, function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    //create a new campgrounda and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            //redirect back to an updated version of campgrounds page
            res.redirect('/campgrounds');   
        }
    });
});

//SHOW Route - shows more info about one campground
router.get('/:id', function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            //render SHOW template with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

//EDIT Route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            req.flash('error', 'Something went wrong. Could not find the requested campground.');
            res.redirect('back');
        }
        res.render('campgrounds/edit', {campground: foundCampground});     
    });
});


//UPDATE Route
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash('error', 'Something went wrong. Could not update campground.');
            res.redirect('/campgrounds');
        } else {
            req.flash('success', 'Your changes have been saved!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//DESTROY Route
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            req.flash('error', 'Something went wrong. Could not delete campground.');
            res.redirect('/campgrounds');
        } else {
            req.flash('success', 'Campground deleted.');
            res.redirect('/campgrounds');
        }   
    });
});

module.exports = router;