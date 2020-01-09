const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        require: true
    },
    users: [{
        type: String
    }],
    messageCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Channels',channelSchema);