var express = require("express");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1508768516474-73606cb84ce2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e074f33c229b735080438a384e50ada1&auto=format&fit=crop&w=800&q=60"},
    {name: "Bear Gulley", image: "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=890e75a342e46be601584be1318ba5db&auto=format&fit=crop&w=500&q=60"},
    {name: "Nutria Wetlands", image: "https://images.unsplash.com/photo-1533875657421-5c7eafe6db43?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=31bccd3f0e6f6e5e4a86af230273927a&auto=format&fit=crop&w=500&q=60"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1508768516474-73606cb84ce2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e074f33c229b735080438a384e50ada1&auto=format&fit=crop&w=800&q=60"},
    {name: "Bear Gulley", image: "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=890e75a342e46be601584be1318ba5db&auto=format&fit=crop&w=500&q=60"},
    {name: "Nutria Wetlands", image: "https://images.unsplash.com/photo-1533875657421-5c7eafe6db43?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=31bccd3f0e6f6e5e4a86af230273927a&auto=format&fit=crop&w=500&q=60"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1508768516474-73606cb84ce2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e074f33c229b735080438a384e50ada1&auto=format&fit=crop&w=800&q=60"},
    {name: "Bear Gulley", image: "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=890e75a342e46be601584be1318ba5db&auto=format&fit=crop&w=500&q=60"},
    {name: "Nutria Wetlands", image: "https://images.unsplash.com/photo-1533875657421-5c7eafe6db43?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=31bccd3f0e6f6e5e4a86af230273927a&auto=format&fit=crop&w=500&q=60"}
];

// ROUTES
app.get("/", function(req, res) {
  res.render("landing") ;
});

app.get("/campgrounds", function(req, res) { // show the campgrounds
    // Render the file campgrounds.ejs, take the local array, campgrounds, and 
    // make it avilable in other EJS files under the name, campgrounds.
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res) { // create a new campground
    // res.send("YOU HIT THE POST ROUTE!");
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect to campgrounds page
    res.redirect("campgrounds"); // redirect defaults as a GET request
});

app.get("/campgrounds/new", function(req, res) { // show the form that will feed the post camprounds route.
   res.render("new"); 
});



app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp Server is listening!!!");
});