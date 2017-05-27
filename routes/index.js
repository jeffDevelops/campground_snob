var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var flash = require('connect-flash');

///////////////////////////////////////
//ROOT ROUTE///////////////////////////
///////////////////////////////////////

router.get('/', function(req, res) {
    res.render('landing');
});

///////////////////////////////////////
//AUTHENTICATION ROUTES////////////////
///////////////////////////////////////

//Show register form
router.get('/register', function(req, res) {
    res.render('register'); 
});

//Handle Register logic
router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, registeredUser) {
        if(err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('back');
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', 'You are now registered! Welcome to the camping-enthusiast community!');
            res.redirect('back');   
        });
    });
});

//Show login form
router.get('/login', function(req, res) {
    res.render('login');
});

//Handling login logic
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if(err) {
                return next(err);
            }
            var redirectTo = req.session.redirectTo ? req.session.redirectTo: '/campgrounds';
            delete req.session.redirectTo;
            res.redirect(redirectTo);
        });
    })(req, res, next);   
});
// router.post('/login', passport.authenticate('local',
//     {
//         successRedirect: 'back',
//         failureRedirect: '/login',
//         failureFlash: 'We were unable to match this password with the username you entered. Please try again.',
//         successFlash: 'Successfully logged you in!'
//     }
// ), function(req, res) {
//     console.log(req.body);
// });

//Logout Route
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds');
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;