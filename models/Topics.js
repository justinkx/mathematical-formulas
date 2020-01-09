const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
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
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Categories'
    }
});

module.exports = mongoose.model('Topics',topicSchema);