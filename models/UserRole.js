const mongoose = require('mongoose');

const userRoleSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    isAdmin: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('Roles', userRoleSchema);