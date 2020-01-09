const express = require('express');
const router = express.Router();

const chatService = require('../services/chatService');

router.get('/:userId',channelMessages);


function channelMessages(req,res,next) {
    chatService.channelMessages(req.params.userId)
    .then(response => res.json(response))
    .catch(error => next(error));
}

module.exports = router;