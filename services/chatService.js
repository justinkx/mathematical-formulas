const Users = require('../models/User');
const Channels = require('../models/Channel');

async function channelMessages(userId) {
    const channels = await Channels.find({
        users: userId
    });
    let _users = [];
    channels.map((channel)=> {
        channel.users.map((id)=> {
           _users.push(id);
        });
    });
    let unique = [...new Set(_users)];
    const _USERS = await Users.find()
    .where('_id')
    .in(unique);
    const response =  {channels: channels,_users: _USERS};
    return response;
}

module.exports = {
    channelMessages
}