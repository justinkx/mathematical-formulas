const config = require('../_helpers/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const roleService = require('./roleService');

const User = require('../models/User');
const Roles = require('../models/UserRole');

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret,{
            expiresIn: '24h'
        });
        return {
            ...userWithoutHash,
            token
        };
    }
    if (!user) {
        throw `email or password is incorrect`;
    }
}

async function getAll() {
    return await User.find().select('-password');
}

async function getById(id) {
    return await User.findById(id).select('-password');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw `Email ${userParam.email} is already taken`;
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    const createdUser = await user.save();
    const _user = createdUser.toObject();

    if (!await Roles.findOne({userId: _user._id})) {
        const newRole = new Roles({userId: _user._id});
        await newRole.save();
    }
    delete _user.password;
    return {
		message: 'User created successfully ...',
		user: _user
	};
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }
    const role = await roleService.findUserRole(id);
    if (!role.isAdmin) {
        throw `You Don't Have Admin Access`;
    }
    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    const editedUser = await user.save();
    return {
		message: 'User edited successfully ...',
		user: editedUser
	};
}

async function _delete(id) {
    const role = await roleService.findUserRole(id);
    if (!role.isAdmin) {
        throw `You Don't Have Admin Access`;
    }
    await User.findByIdAndRemove(id);
}

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};