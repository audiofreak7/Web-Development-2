// NPM Init and Package.json
//
// * Use the '--save' flag to install packages
// * Explain what the package.json file does - holds metadata about the app.
// * Use 'npm init' to create a new package.json

// Use the '*' route matcher
// Write routes containing Route Parameters
// Route order (the sequencial order of the routes below) matters!


var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res) { // 'request' and 'response' 
   res.send("Hi there!"); 
}); 
    

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
   console.log("Someone made a request to '/bye'.");
   res.send("Goodbye!"); 
});


// "/dog" => "WOOF!"
app.get("/dog", function(req, res) {
   console.log(req);
   res.send("WOOF!"); 
});


//Route Parameter - below, subredditName, id, and title can be any string.
app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
   console.log(req.params);
   res.send("Welcome to the comments section!");
});


// below is a Route Parameter ':'. It routes anything directly in the '/r/' directory. subdirectories not included.
app.get("/r/:subredditName", function(req, res){
   console.log(req.params);
   var subreddit = req.params.subredditName;
   res.send("Welcome to the " + subreddit.toUpperCase() + " SubReddit!");
});


// This is the catchall. Anthing that doesn't have a route gets routed here with the '*'
// This must be placed after any other routes in the file to work correctly. 
// Placing it at the top of the file will make all routes go to '*'
app.get("*", function(req, res) {
   res.send("This ain't a page, yo...");
});


// Tell Express to listen for requests (start server)
// IMPORTANT! Use this line every time you use eExpress in a Cloud9 project
// This line changes when you develop on your computer: Example: app.listen(3000, function(){...});
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});
