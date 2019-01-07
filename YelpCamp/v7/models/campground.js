var mongoose = require("mongoose");

// SCHEMA SETUP
// This is set up as a single schema for learning right now. 
// This will be broken out into separate files later as we refactor.
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    // the comments property is an array of comment id's, not the comment data itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
