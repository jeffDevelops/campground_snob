///////////////////////////////////////////////
//DEPENDENCIES/////////////////////////////////
///////////////////////////////////////////////

    var methodOverride  = require('method-override'), //Overrides form method from POST to PUT
        LocalStrategy   = require('passport-local'), //Username/password authentication strategy
        bodyParser      = require('body-parser'), 
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        express         = require('express'),
        flash           = require('connect-flash'),         //Flash messages for error handling
        
///////////////////////////////////////////////
//APP//////////////////////////////////////////
///////////////////////////////////////////////

        app             = express(),
        
///////////////////////////////////////////////       
//SCHEMA///////////////////////////////////////
///////////////////////////////////////////////

    //Schema/Models
        Campground      = require('./models/campground'),
        Comment         = require('./models/comment'),
        User            = require('./models/user'),
        
    //Seed Data
        seedDB          = require('./seeds'),
        
///////////////////////////////////////////////
//ROUTES///////////////////////////////////////
///////////////////////////////////////////////
        
        campgroundsRoutes   = require('./routes/campgrounds'),
        commentsRoutes      = require('./routes/comments'),
        authRoutes          = require('./routes/index');

///////////////////////////////////////////////
//CONFIG///////////////////////////////////////
///////////////////////////////////////////////

//Empty and seed database with sample data (see seeds.js)    
//seedDB();

//Import body-parser
app.use(bodyParser.urlencoded({extended: true}));

//Connect mongoose
mongoose.connect('mongodb://localhost/yelp_camp');

//Set view engine to ejs
app.set('view engine', 'ejs');

//Serve public directory (for custom stylesheets)
app.use(express.static(__dirname + '/public'));

//Import method override
app.use(methodOverride('_method'));

//Import Flash
app.use(flash());

//Passport Config
app.use(require('express-session')({
    secret: "Khaleesi is the cutest doggie ever.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) { //
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

//Import Routes
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);
app.use(authRoutes);

///////////////////////////////////////
//TELL SERVER TO LISTEN FOR REQUESTS///
///////////////////////////////////////

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started");
});