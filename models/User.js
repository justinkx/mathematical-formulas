const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    channels: [{
        type: String
    }],
    hash: {
        type: String, required: true
    },
    mobileNumber: {
        type: Number,
        require: true,
        unique: true
    },
    createdDate: {
        type: Date, default: Date.now
    }
});


module.exports = mongoose.model('Users', userSchema);