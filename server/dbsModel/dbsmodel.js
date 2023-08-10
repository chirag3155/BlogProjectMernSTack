const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const userdata = mongoose.model('userdata', userSchema);
module.exports=userdata;