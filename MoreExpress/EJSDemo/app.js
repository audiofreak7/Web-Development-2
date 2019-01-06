var express = require("express");
var app = express();

// Include the 'public' directory when running the server
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home.ejs");
    // res.send("<h1>Welcome to the HomePage!</h1><h2>You in it nyow, biotch!!!</h2>");
});

app.get("/posts/", function(req, res) {
    var posts = [
        {title: "Post 1", author: "BenjiLover"},
        {title: "Arnold get weird", author: "Arnold69"},
        {title: "You and your mother too", author: "NordBog"}
        ];
    
    res.render("posts.ejs", {posts: posts});
});

app.get("/fallinlovewith/:thing", function(req, res) {
   var thing = req.params.thing;
//   res.send("You fell in love with " + thing);
   res.render("love.ejs", {thingVar: thing});
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server is listening!!!") ;
});