var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// Access (and if necessary, Create) the DB, yelp_camp.
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

// SCHEMA SETUP
// This is set up as a single schema for learning right now. 
// This will be broken out into separate files later as we refactor.
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Add a Campground
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
            res.render("index",{campgrounds:allCampgrounds});
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
   res.render("new"); 
});

// SHOW Route - show info about a specific campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with the provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render the show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp Server is listening!!!");
});