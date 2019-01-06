var mongoose = require("mongoose");

//USER - email, name, posts
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [ // references to post objects
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

// Notice this line is different. Data must be exported when files are modularized.
module.exports = mongoose.model("User", userSchema);
