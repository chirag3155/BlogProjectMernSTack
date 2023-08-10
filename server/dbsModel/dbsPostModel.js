const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
});

const userPost = mongoose.model('userPost', userSchema);
module.exports=userPost;