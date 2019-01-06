var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
 
// APP CONFIG
mongoose.connect("mongodb://localhost:27017/oregon_pics", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer()); // This line must come sometime after the bodyParser line above.

// MONGOOSE SCHEMA/MODEL CONFIG
var picSchema = new mongoose.Schema({
    title: String,
    imageURL: String,
    description: String,
    added: {type: Date, default: Date.now}
});
var Pics = mongoose.model("Pics", picSchema);


// Pics.create({
//     title: "Multnomah Falls",
//     imageURL: "https://images.unsplash.com/photo-1534260574464-1974fc1e6727?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
//     description: "waterfalls during daytimes"
// });


// RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("/pics");
});

// INDEX ROUTE - list all the blogs
app.get("/pics", function(req, res) {
    Pics.find({}, function(err, pics){
        if(err) {
            console.log("ERROR!");
        } else {
            res.render("index", {pics: pics});
        }
    });
});

// NEW Route - Show new pic form
app.get("/pics/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/pics", function(req, res) {
   // sanitize the incoming body, ensures that no harmful code is in the body.
   // req.body.pics.description = req.sanitize(req.body.pics.description);
   var title = req.body.title;
   var imageURL = req.body.imageURL;
   var description = req.body.description;
   var newPic = {title: title, imageURL: imageURL, description: description};
   // create blog
   Pics.create(newPic, function(err, newPic) {
       console.log(req.body.pics);
       if(err) {
           res.render("new");
       } else {
           //then, redirect to the index
           res.redirect("/pics");
       }
   });
});

// SHOW ROUTE
app.get("/pics/:id", function(req,res) {
    Pics.findById(req.params.id, function(err, pic) {
        if(err) {
            res.redirect("/pics");
        } else {
            res.render("show", {pic: pic});
        }
    });
});


// EDIT ROUTE
app.get("/pics/:id/edit", function(req, res) { 
    Pics.findById(req.params.id, function(err, pic) {
        if(err) {
            res.redirect("/pics");
        } else {
            res.render("edit", {pic: pic});
        }
    });
});

// UPDATE ROUTE
app.put("/pics/:id", function(req, res) {
    // sanitize the incoming body, ensures that no harmful code is in the body.
    // req.body.blog.body = req.sanitize(req.body.blog.body);
    Pics.findByIdAndUpdate(req.params.id, req.body, function(err, pic) {
        if(err) {
            console.log("ERROR: " + err);
            res.redirect("/pics");
        } else {
            res.redirect("/pics/" + req.params.id);
        }
    });
});






// DELETE ROUTE
app.delete("/pics/:id", function(req, res) {
    //destroy blog
    Pics.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/pics");
        } else {
            res.redirect("/pics");
        }
    });
});


// End
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Oregon Pics Server is running!");
})