const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        require: true
    },
    isDirectMessage: {
        type: Boolean,
    },
    isChannelMessage: {
        type: Boolean,
    },
    replyTo: {
        type: String
    },
    channelId: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Messages',messageSchema);