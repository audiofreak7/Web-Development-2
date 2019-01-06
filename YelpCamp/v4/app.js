var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// Access (and if necessary, Create) the DB, yelp_camp.
mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", {useNewUrlParser: true});

// remove entries from the database, and seed it with data from the 'seed.js' file
seedDB();

// Add a Campground - i.e. seed the database with this single campground
// Campground.create({
//   name: "Apex Lake",
//   image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2759&q=80",
//   description: "The air is so thin that you can boil water at room temperature!"
// }, function(err, campground) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Newly created campground!")
//         console.log(campground);
//     }
// });


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

// CREATE Route - add new campground to DB
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

// NEW Route - show form to add/create new campground
app.get("/campgrounds/new", function(req, res) { // show the form that will feed the post camprounds route.
   res.render("campgrounds/new"); 
});

// SHOW Route - show info about a specific campground
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

// NEW Comment Route
app.get("/campgrounds/:id/comments/new", function(req, res){
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
app.post("/campgrounds/:id/comments", function(req, res) {
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


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp Server is listening!!!");
});