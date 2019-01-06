var express = require("express");
var app = express();

// ROUTES
app.get("/", function(req, res) { // 'request' and 'response' 
   res.send("Hi there, welcome to my assignment!"); 
}); 

// ANIMAL NOISES ROUTE #1
// app.get("/speak/pig", function(req, res) { 
//   res.send("The pig says 'Oink'"); 
// }); 

// app.get("/speak/cow", function(req, res) { 
//   res.send("The cow says 'Moo'"); 
// }); 

// app.get("/speak/dog", function(req, res) { 
//   res.send("The dog says 'Woof Woof!'"); 
// }); 

//ANIMAL NOISES ROUTE #2
// app.get("/speak/:animal", function(req, res) {
//   var animalName = req.params.animal.toLowerCase(); 
//   var message = "";
//   var noises = {
//       cat: "Meow",
//       dog: "Woof Woof!",
//       pig: "Oink"
//   };
//   var animalNoise = noises[animalName];
//   message = "The " + animalName + " says " + animalNoise;
//   res.send(message);
// });

//ANIMAL NOISES ROUTE #3. Short but harder to read.
app.get("/speak/:animal", function(req, res) {
   var noises = {
       cat: "Meow",
       dog: "Woof Woof!",
       pig: "Oink"
   };
   res.send("The " + req.params.animal + " says " + noises[req.params.animal.toLowerCase()]);
});

app.get("/repeat/:repeatedText/:numberOfReps", function(req, res) { 
    // console.log(res);
   var userText = req.params.repeatedText;
   var repititions = parseInt(req.params.numberOfReps);
   var outputText = "";
   for (var i = 0; i < repititions; i++) {
       outputText += (userText + " ");
   }
   res.send(outputText);
}); 


// Default Route
app.get("*", function(req, res) { 
   res.send("Sorry page not found. What are you doing with your life..."); 
}); 



// Listen
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});

