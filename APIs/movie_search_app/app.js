var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
   res.render("search"); 
});

app.get("/results", function(req, res){
    var query = req.query.search; //get what the text that the user entered, assign it to the var 'query'
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            // res.send(results["Search"][0]["Poster"]);
            res.render("results", {data: data});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server is listening!!!") ;
});