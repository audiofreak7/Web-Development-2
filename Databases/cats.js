var mongoose = require("mongoose"); // Mongoose is an ODM - Object Data Mapper.
mongoose.connect("mongodb://localhost/cat_app"); // connects to the databse. Will make a cat_app collection if one does not exist

// defines what a cat looks like. We could add extra data, or leave some data off of a cat.
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// take the catSchema and compile it into a model.
// makes a collection called "Cats"
// makes several methods avilable to the collection, like 'save' and 'create'
var Cat = mongoose.model("Cat", catSchema);

// create a cat
var george = new Cat({
    name: "Mrs Norris",
    age: 7,
    temperament: "Evil"
});

//add a cat to the database
george.save(function(err, cat) {
  if(err) {
      console.log("Something went wrong!");
  } else {
      console.log("We just saved a cat to the DB.");
      console.log(cat);
  }
});

//create a cat and add it to the database
Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat) {
    if(err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});

// retrieve all cats from the db and console.log each one
Cat.find({}, function(err, cats){
   if(err) {
       console.log("Oh no, error!");
       console.log(err);
   } else {
       console.log("All the cats.");
       console.log(cats);
   }
});