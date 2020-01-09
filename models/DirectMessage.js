const mongoose = require('mongoose');

const directMessage =mongoose.Schema({
  _id: {
    type: Number,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  totalMessages: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date
  }
});

module.exports = mongoose.model('DirectMessage', directMessage);