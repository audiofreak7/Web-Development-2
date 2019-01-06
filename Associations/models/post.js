var mongoose = require("mongoose");

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Notice this line is different. Data must be exported when files are modularized.
module.exports = mongoose.model("Post", postSchema);