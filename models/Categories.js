const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    quote: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Categories',categorySchema);