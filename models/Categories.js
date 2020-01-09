const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Categories',categorySchema);