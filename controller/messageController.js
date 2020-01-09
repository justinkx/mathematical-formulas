const express = require('express');
const router = express.Router();

const messageService = require('../services/messageService');
const channelService = require('../services/channelService');

router.get('/', getMessages);
router.get('/:channelId', getChannelMessages);
router.post('/',postMessage);
router.delete('/:id', deleteMessage);
function getMessages(req,res,next) {
  messageService.getMessages()
  .then(messages => {res.json(messages)})
  .catch(error => next(error));
}

function getChannelMessages(req,res,next) {
    messageService.channelMessages(req.params.channelId)
    .then(messages => {res.json(messages)})
    .catch(error => next(error));
}

function postMessage(req,res,next) {
    messageService.postMessage(req.body)
    .then(message => {
      channelService.updateChannelMessage(message.channelId);
      res.json(message);
    })
    .catch(error => next(error));
}

function deleteMessage(req,res,next) {
  messageService.deleteMessage(req.body.id)
  .then((message) => res.json(message))
  .catch(error => next(error));
}
module.exports = router;