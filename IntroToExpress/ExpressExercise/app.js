var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res) { // 'request' and 'response' 
   res.send("Hi there! Welcome to my assignment."); 
}); 


// Animals and Noises
app.get("/speak/:animal/", function(req, res) { 
   var critter = req.params.animal;
   var critterNoise = "";
   var sounds = {
       dog: "Woof",
       cat: "I hate you human",
       pig: "Oink",
       cow: "Moo"
   }
   
    critterNoise = sounds[critter];
    res.send("The " + critter + " goes '" + critterNoise + "!'"); 
}); 


// Repeated Text
app.get("/repeat/:userText/:repetitions", function(req, res) { 
    console.log(req.params.userText);
    var text = req.params.userText + " ";
    var result = "";
    var reps = Number(req.params.repetitions);
    for(var i = 0; i < reps; i++) {
       result += text; 
   }
   
   res.send(result); 
}); 


// Default Route
app.get("*", function(req, res) { 
   res.send("Sorry page not found. What are you doing with your life..."); 
}); 




app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});