const mongoose = require('mongoose');

const equationSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        require: true
    },
    latex: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Topics'
    }
});

module.exports = mongoose.model('Equations',equationSchema);