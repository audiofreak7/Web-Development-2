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
// added for express-session. This must come after the previous line of code.
app.use(require("express-session") ({
    secret: "Cool off a dog by getting its feet wet",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
// set up passport
app.use(passport.initialize());
app.use(passport.session());
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
app.get("/secret", function(req, res) {
    res.render("secret");
});

// AUTH Routes


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server started!");
});