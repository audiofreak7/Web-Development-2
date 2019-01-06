// The following group of lines are boilderplate lines.
// They are required when using npm packages like express, body-parser or ejs.
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // allows you to type names of EJS files in this file without writing the '.ejs' file extention.

var friends = ["Tony", "Bob", "George", "Pierre", "Flarbert"];

app.get("/", function(req, res) {
   res.render("home"); 
});

app.get("/friends/", function(req, res) {
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res) {
    var newFriend = req.body.newfriend; // newfriend was spidified in the input element in friends.ejs
    friends.push(newFriend);
   res.redirect("/friends"); 
});

// Boiler plate lines below.
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server started!"); 
});