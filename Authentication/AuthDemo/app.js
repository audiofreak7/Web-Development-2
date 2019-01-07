// The order of code is very important. 
// Please keep this in mind.

var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true});
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// added for express-session. This must come after the line of code 'var app = express();'
app.use(require("express-session") ({
    secret: "Cool off a dog by getting its feet wet",
    resave: false,
    saveUninitialized: false
}));



// set up passport
app.use(passport.initialize());
app.use(passport.session());
// create a new LocalStrategy using the User authenticate method,
// which comes from passportLocalMongoose
passport.use(new LocalStrategy(User.authenticate()));
// The following passport methods read the session then, 
// 1. take the encoded data from the session and unencoding it (deserialize)
// 2. encoding the data and putting it back in the session (serialize)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//================
// ROUTES
//================

// ROOT Route
app.get("/", function(req, res) {
    res.render("home");
});

// SECRET Route
// if the user 'isLoggedIn', continue the function and render 'secret'.
app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});

// AUTH ROUTES
// show sign up form
app.get("/register", function(req, res) {
    res.render("register");
});

// handling user sign up
// note that the password itself is not saved to the user's data. Instead, a hashed version is saved.
app.post("/register", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render('register');
        }
        // logs in the user using the serialize method, using the 'local' strategy
        // you can swap 'local' to 'twitter', 'facebook' to change login strategy
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
        });
    });
});

// LOGIN ROUTES
// render login form
app.get("/login", function(req,res) {
    res.render("login");
});

// login logic
// POST to '/login'. Route based on login succss or failure
// middleware starts at 'passport' and ends after the 'failureRedirect'
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
});

//Log Out
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
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
    console.log("The server started!");
});