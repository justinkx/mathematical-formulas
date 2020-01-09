const express = require('express');
const router = express.Router();
const channelService = require('../services/channelService');


router.get('/', getChannel);
router.post('/create', createChannel);
function getChannel(req, res, next) {
    channelService.getChannels()
    .then(channels => res.json(channels))
    .catch(error=> next(error))
}

function createChannel(req, res, next) {
  channelService.createChannel(req.body)
  .then(channel => {res.json(channel)})
  .catch(error => {next(error)});
}
module.exports = router;