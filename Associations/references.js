var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

// Two module are create using separate files mentioned below. 
// This helps to clean up code in this file.
var Post = require("./models/post");
var User = require("./models/user");

// CREATE USER
// User.create({ 
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

// CREATE POST
// Post.create({
//     title: "Mange Tres Bien - Part 5",
//     content: "Aardvarks should avoid cocaine at all costs."
// }, function(err, post) {
//     if(err) {
//         console.log(err);
//     } else {
//         User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
//             if(err) {
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function(err, data) {
//                     if(err) {
//                         console.log(err);
//                     } else {
//                         console.log(data);
//                     }
//                 })
//             }
//         });
//     }
// });

// FIND USER, and
// FIND ALL POSTS FOR THAT USER
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
});