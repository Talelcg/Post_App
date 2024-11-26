const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Post',
          required: true 
    },
    content: {
         type: String,
          required: true 
    },
    author: {
         type: String, 
         required: true
     },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
