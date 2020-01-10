const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
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
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Categories'
    },
    image: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Topics',topicSchema);