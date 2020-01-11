const Roles = require('../models/UserRole');

async function findUserRole(uid) {
    return await Roles.findOne({userId: uid});
}

module.exports = {
    findUserRole
}