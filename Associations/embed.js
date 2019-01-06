var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

//USER - email, name, posts
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema] // an array of Posts for a user
});
var User = mongoose.model("User", userSchema);



// var newUser = new User({
//     name: "Bob Harding",
//     email: "roberto@harding.edu"
// });

// newUser.posts.push({
//     title: "Borscht",
//     content: "The best soup money can't buy."
// });

// newUser.save(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Ground Apples or Horse Apples - Which to eat?",
//     content: "Eat the dang ground apples. They'se taters!"
// });

// newPost.save(function(err, post) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Bob Harding"}, function(err, user) {
    if(err) {
        console.log(err);
    } else {
        user.posts.push({
            title: "Egg Foo Yung",
            content: "Fancy scrambled eggs, with lovely brown sauce."
        });
        user.save(function(err, user) {
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});