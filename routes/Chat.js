const express = require('express');
const router = express.Router();

const Channels = require('../models/Channel');
const Users = require('../models/User');

router.get('/:userId',async (req,res)=> {
    try {
        const channels = await Channels.find({
            users: req.params.userId
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
        res.json(response);
    } catch (error) {
        console.log(res.status(500).json({
            message: 'Internal Server Error'
        }));
        res.json({error: error});
    }
});

module.exports = router;