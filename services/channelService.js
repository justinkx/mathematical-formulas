const Channel = require('../models/Channel');

async function getChannels() {
    return await Channel.find()
}

async function createChannel(channelParams) {
    const newChannel = new Channel(channelParams);
    await newChannel.save();
}

async function updateChannelMessage(channelId) {
    const channel = await Channel.findById(channelId);
    channel.messageCount+= 1;
    await channel.save();
}
module.exports = {
	getChannels,
	createChannel,
	updateChannelMessage
};