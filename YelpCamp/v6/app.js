var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// Access (and if necessary, Create) the DB, yelp_camp.
mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", {useNewUrlParser: true});
// Serve the public directory, so that the stylesheet is easier to access
// '__dirname' refers to the app working directory
app.use(express.static(__dirname + "/public"));

// remove entries from the database, and seed it with data from the 'seed.js' file
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session") ({
    secret: "My cat's breath smells like cat food",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// create a new LocalStrategy using the User authenticate method,
// which comes from passportLocalMongoose
passport.use(new LocalStrategy(User.authenticate()));
// The following passport methods read the session then, 
// 1. take the encoded data from the session and unencode it (deserialize)
// 2. encode the data and put it back in the session (serialize)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass the req.user data to every template. The side effect of this is that the navbar auth links appear correctly.
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});



// ROUTES
app.get("/", function(req, res) {
  res.render("landing") ;
});

// INDEX Route - show all campgrounds
app.get("/campgrounds", function(req, res) { // show the campgrounds
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});

// CREATE Campground Route - add new campground to DB
app.post("/campgrounds", function(req, res) { // create a new campground
    // res.send("YOU HIT THE POST ROUTE!");
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);     
        } else {
            //redirect to campgrounds page
            res.redirect("campgrounds"); // redirect defaults as a GET request
        }
    });
});

// NEW Campground Route - show form to add/create new campground
app.get("/campgrounds/new", function(req, res) { // show the form that will feed the post camprounds route.
   res.render("campgrounds/new"); 
});

// SHOW Campground Route - show info about a specific campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with the provided ID, then populate the comments for that campground,
    // then execute the query.
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            // render the show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ===================================
// ROUTES FOR COMMENTS
// ===================================

// NEW Comment Route - user must be logged in to leave a comment.
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    // find campground by ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// CREATE Comment Route
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// =====================
// AUTHENTICATION ROUTES
// =====================

// Show registration form
app.get("/register", function(req, res){
    res.render("register");
});

// Sign Up logic
app.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render('register');
        }
        // logs in the user using the serialize method, using the 'local' strategy
        // you can swap 'local' to 'twitter', 'facebook' to change login strategy
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN ROUTES
// render login form
app.get("/login", function(req,res) {
    res.render("login");
});

// Login Logic
// POST to '/login'. Route based on login success or failure
// Middleware starts at 'passport' and ends after the 'failureRedirect'
// When a user tries to login, authenticate their credentials.
// If the login info exists in the DB, route to '/campgrounds'
// otherwise, route to '/login'
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
});

//Log Out
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

// our own custom middleware
// if the user is authenticated, continue the code, i.e. 'return next();'
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp Server is listening!!!");
});