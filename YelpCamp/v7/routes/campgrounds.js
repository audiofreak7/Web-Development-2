var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX Route - show all campgrounds
router.get("/campgrounds", function(req, res) { // show the campgrounds
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
router.post("/campgrounds", function(req, res) { // create a new campground
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
router.get("/campgrounds/new", function(req, res) { // show the form that will feed the post camprounds route.
   res.render("campgrounds/new"); 
});

// SHOW Campground Route - show info about a specific campground
router.get("/campgrounds/:id", function(req, res) {
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

module.exports = router;