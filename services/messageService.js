const message = require('../models/Message');
const Channel = require('../models/Channel');
const jwt = require('jsonwebtoken');
const config = require('../_helpers/config.json');

async function getMessages() {
    return await message.find();
}

async function channelMessages(channelId) {
  return await message.find({
    channelId: channelId
  });
}

async function postMessage(messageParams) {
    const channelData = await Channel.findById(messageParams.channelId);
    if (!channelData) {
      const newMessage = new message(messageParams);
		const messagePost = await newMessage.save();
		return messagePost;
    }
    else {
      const newMessage = new message(messageParams);
      const messagePost = await newMessage.save();
      return messagePost;
    }
}
async function deleteMessage(messageId) {
  await message.findByIdAndDelete(messageId);
}

module.exports = {
	getMessages,
	channelMessages,
	postMessage,
	deleteMessage,
};